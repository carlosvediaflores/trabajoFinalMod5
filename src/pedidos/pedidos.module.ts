import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Pedido } from './entities/pedido.entity';
import { ProductoPedido } from './entities/producto-pedido.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports: [ TypeOrmModule.forFeature([Producto, Pedido, ProductoPedido, Usuario]),  UsuariosModule ],

})
export class PedidosModule {}
