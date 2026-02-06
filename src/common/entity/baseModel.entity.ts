import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class baseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    creatDate: Date;

    @UpdateDateColumn()
    updateDate: Date;
}