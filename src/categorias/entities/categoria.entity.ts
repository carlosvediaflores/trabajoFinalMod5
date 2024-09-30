import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100})
    nombreCategoria: string;

    @Column({ default: "ACTIVO"})
    estado: string;

    @OneToMany(() => Producto, producto => producto.categoria )
    productos: Producto[]; // Una categoria puede tener varios productos

}
