import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductoPedido } from "./producto-pedido.entity";
import { BaseAuditoria } from "src/common/core/base-auditoria.entity";

@Entity()
export class Pedido extends BaseAuditoria{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fecha: Date;

    @Column({ default: "PENDIENTE"}) //PENDIENTE, ATENDIDO, RECHAZADO
    estado: string

    @OneToMany(() => ProductoPedido, (productoPedido) => productoPedido.pedido, { cascade: true, eager: true })
    productos: ProductoPedido[];

}
