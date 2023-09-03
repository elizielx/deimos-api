import { CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class BaseEntity {
    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updateAt?: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
