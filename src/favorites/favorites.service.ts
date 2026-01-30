import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotivationService } from 'src/motivation/motivation.service';
import { UsersModel } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(UsersModel)
        private readonly userRepository: Repository<UsersModel>,
        private readonly usersService: UsersService,
        private readonly motivationService: MotivationService
    ) { }

    async toggleFavorite(user: UsersModel, motivationId: number) {
        const already = this.motivationService.getIsFavored(user, motivationId);

        if (already) {
            await this.removeFavorite(user.id, motivationId);
        } else {
            await this.addFavorite(user.id, motivationId);
        }

        return !already;
    }

    async removeFavorite(id: number, motivationId: number) {
        await this.userRepository
            .createQueryBuilder()
            .relation(UsersModel, 'favoriteMotivationIds')
            .of(id)
            .remove(motivationId)
    }

    async addFavorite(id: number, motivationId: number) {
        await this.userRepository
            .createQueryBuilder()
            .relation(UsersModel, 'favoriteMotivationIds')
            .of(id)
            .add(motivationId)
    }

    async getFavoriteMotivationIds(user: UsersModel) {
        const userInfo = await this.usersService.findUserById(user);
        return userInfo?.favoriteMotivationIds;
    }
}
