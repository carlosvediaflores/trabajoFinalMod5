import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { FilterDto } from './dto/filter-producto.dto';
//import { isUUID } from 'class-validator';
import { validate as isUUID } from 'uuid';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { log } from 'console';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ProductImage } from './entities';

@Injectable()
export class ProductosService {

  constructor(

    @InjectRepository(Producto)
    private readonly productRepository: Repository<Producto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,


  ) {}
  async create(createProductoDto: CreateProductoDto, user: Usuario) {
    let categoria:Categoria
    if(isUUID(createProductoDto.idCategoria) ){ 
       categoria = await this.categoriaRepository.findOneBy({ id: createProductoDto.idCategoria });
    }
    if (!categoria) {
      throw new NotFoundException(`La categoría con ID ${createProductoDto.idCategoria} no existe.`);
    }
    try {
      const { images = [], ...productDetails } = createProductoDto;
      const product = this.productRepository.create({...productDetails,
        images: images.map( image => this.productImageRepository.create({ url: image }) ),
        categoria,
        user
      });
      await this.productRepository.save( product );

      return { ...product, images };
      
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          `Producto ya existe registrado con ${JSON.stringify(error.detail)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(`Revisar los Logs`);
    }

  }

  async findAll(filterDto:FilterDto) {
    const { limit = 10, offset = 0 } = filterDto;

    const products = this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        categoria: true,
      }
    })
    return (await products).map( ( product ) => ({
      ...product,
      images: product.images.map( img => img.url )
    }))
  
  }

  async findOne(term: string) {
    let producto: Producto;
    if ( isUUID(term) ) {
      producto = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod'); 
      producto = await queryBuilder
        .where('UPPER(nombre) =:nombre', {
          nombre: term.toUpperCase(),
        })
        .leftJoinAndSelect('prod.images','prodImages')
        .leftJoinAndSelect('prod.categoria', 'categoria')
        .getOne();
    }
    if ( !producto ) 
      throw new NotFoundException(`Producto con ${ term } no existe`);
    return producto
  }

  async findOnePlain( term: string ) {
    const { images = [], ...rest } = await this.findOne( term );
    return {
      ...rest,
      images: images.map( image => image.url )
    }
  }

  async update(id: string, updateProductoDto: UpdateProductoDto, user: Usuario) {
    const { images, ...toUpdate } = updateProductoDto;
    const product = await this.productRepository.preload({
      id,
      ...toUpdate
    });

    if ( !product ) throw new NotFoundException(`Producto con id: ${ id } no existe`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if( images ) {
        await queryRunner.manager.delete( ProductImage, { product: { id } });

        product.images = images.map( 
          image => this.productImageRepository.create({ url: image }) 
        )
      }
      
      // await this.productRepository.save( product );
      product.user = user;
      
      await queryRunner.manager.save( product );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );
      
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          `Producto ya existe registrado con ${JSON.stringify(error.detail)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(`Revisar los Logs`);
    }

  
  }

  async remove(id: string) {
    const producto = await this.findOne( id );
    await this.productRepository.remove( producto );
  }
}
