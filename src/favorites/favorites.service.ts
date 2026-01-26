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

    async toggleFavorite(userId: string, motivationId: number) {
        const user = await this.userRepository.findOne({
            where: { userId },
            relations: { favoriteMotivationIds: true }
        })

        if (!user) {
            throw new NotFoundException('유저가 존재하지 않습니다');
        }

        const already = user.favoriteMotivationIds?.some(m => m.id === motivationId);

        if (already) {
            return await this.removeFavorite(userId, motivationId);
        } else {
            return await this.addFavorite(userId, motivationId);
        }
    }

    async removeFavorite(userId: string, motivationId: number) {
        await this.userRepository
            .createQueryBuilder()
            .relation(UsersModel, 'favoriteMotivationIds')
            .of(userId)
            .remove(motivationId)
    }

    async addFavorite(userId: string, motivationId: number) {
        await this.userRepository
            .createQueryBuilder()
            .relation(UsersModel, 'favoriteMotivationIds')
            .of(userId)
            .add(motivationId)
    }
}
