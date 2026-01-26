import { baseModel } from "src/common/entity/baseModel.entity";
import { UsersModel } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class MotivationModel extends baseModel {
    @Column()
    author: string;

    @Column()
    text: string;

    @ManyToMany(() => UsersModel, (user) => user.favoriteMotivationIds)
    users: UsersModel[];
}