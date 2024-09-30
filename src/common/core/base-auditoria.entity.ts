import { Column } from "typeorm";

export abstract class BaseAuditoria{
    @Column({ type: 'uuid', nullable: true})
    idUsuarioCreacion: string;

    @Column({ type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    fechaCreacion: Date;

    @Column({ type: 'uuid', nullable: true})
    idUsuarioModificacion: string;

    @Column({ type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    fechaModificacion: Date;

}
