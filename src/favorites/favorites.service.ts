import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(UsersModel)
        private readonly userRepository: Repository<UsersModel>
    ) { }

    async toggleFavorite(userId: number, motivationId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: { favoriteMotivationIds: true }
        })

        if (!user) {
            throw new NotFoundException('유저가 존재하지 않습니다');
        }

        const already = user.favoriteMotivationIds?.some(m => m.id === motivationId);

        if (already) {
            await this.removeFavorite(userId, motivationId);
        } else {
            await this.addFavorite(userId, motivationId);
        }

        return !already;
    }

    async removeFavorite(userId: number, motivationId: number) {
        await this.userRepository
            .createQueryBuilder()
            .relation(UsersModel, 'favoriteMotivationIds')
            .of(userId)
            .remove(motivationId)
    }

    async addFavorite(userId: number, motivationId: number) {
        await this.userRepository
            .createQueryBuilder()
            .relation(UsersModel, 'favoriteMotivationIds')
            .of(userId)
            .add(motivationId)
    }
}
