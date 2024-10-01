import { Categoria } from 'src/categorias/entities/categoria.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Producto {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'ID producto',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Leche',
    description: 'Nombre del producto',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  nombre: string;

  @ApiProperty({
    example: 19.90,
    description: 'Precio del producto',
})
  @Column('float', {
    default: 0,
  })
  precio: number;

  @ApiProperty({
    example: 'Leche es lata de ...',
    description: 'Descripción del producto',
    default: null,
})
  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion: string;

  @ApiProperty({
    example: 'ACTIVO',
    description: 'Estado de producto',
    default:'ACTIVO'
})
  @Column({ default: 'ACTIVO' })
  estado: string;

  // images
  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => Usuario, (user) => user.product, { eager: true })
  user: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    cascade: true,
    eager: true,
  })
  categoria: Categoria; // un producto pertenece a una categoria
}
