import { IsNumber, IsString } from "class-validator";
import { baseModel } from "src/common/entity/baseModel.entity";
import { MotivationModel } from "src/motivation/entity/motivations.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class UsersModel extends baseModel {
    @Column({
        unique: true
    })
    @IsString()
    nickName: string;

    @Column({
        unique: true
    })
    @IsString()
    userId: string;

    @Column()
    @IsString()
    password: string;

    @Column({
        default: 'en'
    })
    @IsString()
    language: string;

    @Column({
        default: 1
    })
    @IsNumber()
    lastMotivationId: number;

    @ManyToMany(() => MotivationModel, (favoriteMotivationId) => favoriteMotivationId.users)
    @JoinTable()
    favoriteMotivationIds: MotivationModel[];
}
