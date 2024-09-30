import { Producto } from "src/productos/entities";
import { Role } from "src/roles/entities/role.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
        
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    nombres: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

   /*  @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[]; */

    @OneToMany(
        () => Producto,
        ( product ) => product.user
    )
    product: Producto;

    @ManyToMany(() => Role, {eager: true })
    @JoinTable()
    roles: Role[];

    
    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }
}
