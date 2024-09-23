import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { FilterDto } from './dto/filter-producto.dto';
//import { isUUID } from 'class-validator';
import { validate as isUUID } from 'uuid';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { log } from 'console';

@Injectable()
export class ProductosService {

  constructor(

    @InjectRepository(Producto)
    private readonly productRepository: Repository<Producto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,


  ) {}
  async create(createProductoDto: CreateProductoDto) {
    let categoria:Categoria
    if(isUUID(createProductoDto.idCategoria) ){ 
       categoria = await this.categoriaRepository.findOneBy({ id: createProductoDto.idCategoria });
    }
    if (!categoria) {
      throw new NotFoundException(`La categoría con ID ${createProductoDto.idCategoria} no existe.`);
    }
    log(categoria, createProductoDto)
    try {

      const product = this.productRepository.create({...createProductoDto, categoria});
      await this.productRepository.save( product );

      return product;
      
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

  findAll(filterDto:FilterDto) {
    const { limit = 10, offset = 0 } = filterDto;

    return this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        categoria: true,
      }
    })
  
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
        //.leftJoinAndSelect('prod.categoria','prdCategoria')
        .getOne();
    }
    if ( !producto ) 
      throw new NotFoundException(`Producto con ${ term } no existe`);
    return producto
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductoDto
    });

    if ( !product ) throw new NotFoundException(`Producto con id: ${ id } no existe`);

    try {
      await this.productRepository.save( product );
      return product;
      
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
