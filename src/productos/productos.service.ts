import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { FilterDto } from './dto/filter-producto.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductosService {

  constructor(

    @InjectRepository(Producto)
    private readonly productRepository: Repository<Producto>,

  ) {}
  async create(createProductoDto: CreateProductoDto) {
    try {

      const product = this.productRepository.create(createProductoDto);
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
  handleDBExceptions(error: any) {
    throw new Error('Method not implemented.');
  }

  findAll(filterDto:FilterDto) {
    const { limit = 10, offset = 0 } = filterDto;

    return this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    })
  
  }

  async findOne(term: string) {
    let producto: Producto;
    if ( isUUID(term) ) {
      producto = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder(); 
      producto = await queryBuilder
        .where('UPPER(nombre) =:nombre or slug =:slug', {
          nombre: term.toUpperCase(),
          slug: term.toLowerCase(),
        }).getOne();
    }


    if ( !producto ) 
      throw new NotFoundException(`Producto con ${ term } no existe`);
    return producto
  }

  update(id: string, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: string) {
    return `This action removes a #${id} producto`;
  }
}
