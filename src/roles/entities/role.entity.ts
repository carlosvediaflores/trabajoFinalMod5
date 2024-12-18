import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default:'USER'})
    nombreRol: string; //ADMIN, //USUARIO

    @Column({nullable: true,})
    description: string; //ADMIN, //USUARIO

}
