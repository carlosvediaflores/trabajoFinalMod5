import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductoPedido } from './entities/producto-pedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class PedidosService {

  private client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 8877 },//Conectar al microservicio de notificaciones en el puerto 8877
  });

  private clientFacturacion = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3001 },//Conectar al microservicio de facturacion en el puerto 3001
  });


  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

    @InjectRepository(ProductoPedido)
    private productoPedidoRepository: Repository<ProductoPedido>,

    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    private dataSource: DataSource,
  ) {}

  async create(createPedidoDto: CreatePedidoDto, user: Usuario): Promise<Pedido> {
   
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const nuevoPedido = new Pedido();
      nuevoPedido.fecha = new Date();
      nuevoPedido.idUsuarioCreacion = user.id;
      const pedidoCreado = await queryRunner.manager.save(nuevoPedido);

      for (const productoPedidoDto of createPedidoDto.productos) {
        const producto = await this.productoRepository.findOne({ where: { id: productoPedidoDto.idProducto } });
        if (!producto) {
          throw new BadRequestException(`El producto con id ${productoPedidoDto.idProducto} no existe`);
        }

        const nuevoProductoPedido = new ProductoPedido();
        nuevoProductoPedido.pedido = pedidoCreado;
        nuevoProductoPedido.producto = producto;
        nuevoProductoPedido.cantidad = productoPedidoDto.cantidad;

        await queryRunner.manager.save(nuevoProductoPedido);
      }

      await queryRunner.commitTransaction();
      return pedidoCreado;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`No se pudo realizar la creacion del pedido: ${error.message}`)
    } finally {
      await queryRunner.release();
    }

  }
  handleDBExceptions(error: any) {
    throw new Error('Method not implemented.');
  }

  findAll() {
    return this.pedidoRepository.find({
      relations: {
        productos: true,
      }
    })
  }

  findOne(id: string) {
    return `This action returns a #${id} pedido`;
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto) {
    const { estado } = updatePedidoDto;
    //buscar pedido
    const pedido = await this.pedidoRepository.findOneBy({ id: id });
    if (!pedido) {
      throw new NotFoundException('No se pudo encontrar el pedido');
    }
    if (pedido.estado !== 'PENDIENTE') {
      // throw new BadRequestException('No se puede realizar el cambio de estado');
    }

    const pedidoDetalle = this.findOne(id);
    this.clientFacturacion.emit('generar_factura', pedidoDetalle);
    
    console.log('envio de notificacion')
    this.client.emit('notify_order_status_change', { id: id, estado: estado, email: 'heraldcnp@gmail.com' });

    pedido.estado = estado;
    return await this.pedidoRepository.save(pedido);

  }

  remove(id: string) {
    return `This action removes a #${id} pedido`;
  }
}
