import { ApiProperty } from "@nestjs/swagger";
import { Producto } from "src/productos/entities";
import { Role } from "src/roles/entities/role.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
        
    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'ID del Usuario',
        uniqueItems: true,
      })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Correo del usuario (unique)',
        example: 'carlosvf782@gmail.com',
        nullable: false,
        minLength: 8
    })
    @Column('text', {
        unique: true
    })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: '$2b$10$bXvKeOEY8U0vr4KZ4LbIEuP1XPweuTRxCuI8HgnEFC5ZqiCRaLg9C',
        nullable: false,
        minLength: 8
    })
    @Column('text', {
        select: false
    })
    password: string;

    @ApiProperty({
        description: 'Nombres y Apellidos del ususario',
        example: 'Carlos Rudy Vedia Flores',
        nullable: true,
    })
    @Column('text')
    nombres: string;

    @ApiProperty({
        example: true,
        description: 'Estado de Usuario',
        default:true
    })
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

    @ApiProperty()
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
