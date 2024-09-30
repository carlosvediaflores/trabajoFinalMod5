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

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  nombre: string;

  @Column('float', {
    default: 0,
  })
  precio: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion: string;

  @Column({ default: 'ACTIVO' })
  estado: string;

  // images
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
