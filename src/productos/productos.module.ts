import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ProductImage, Producto } from './entities';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [TypeOrmModule.forFeature([Producto, Categoria, ProductImage]), UsuariosModule],
})
export class ProductosModule {}
