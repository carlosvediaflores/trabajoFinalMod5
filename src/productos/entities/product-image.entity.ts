
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';


@Entity({ name: 'product_images' })
export class ProductImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Producto,
        ( product ) => product.images,
        {  onDelete: 'CASCADE' }
    )
    product: Producto

}