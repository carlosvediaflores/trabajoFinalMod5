import { Categoria } from "src/categorias/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    nombre: string;

    @Column('float',{
        default: 0
    })
    precio: number;

    @Column({
        type: 'text',
        nullable: true
    })
    descripcion: string;

    @Column({ default: "ACTIVO"})
    estado: string
    
    @Column('text', {
        array: true,
        default: []
    })
    image: string[];
    
    @ManyToOne(() => Categoria, categoria => categoria.productos, { cascade: true, eager: true })
    categoria: Categoria; // un producto pertenece a una categoria

   
}
