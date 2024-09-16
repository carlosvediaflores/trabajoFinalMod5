import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { FilterDto } from './dto/filter-producto.dto';

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
      this.handleDBExceptions(error);
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

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
