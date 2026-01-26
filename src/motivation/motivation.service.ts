import { Injectable, NotFoundException } from '@nestjs/common';
import { baseUrl } from 'src/common/const/url';
import { MotivationModel } from './entity/motivations.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/entities/user.entity';

@Injectable()
export class MotivationService {
    constructor(
        @InjectRepository(MotivationModel)
        private readonly motivationRepository: Repository<MotivationModel>,
        private readonly userService: UsersService
    ) { }

    async getStartMotivationData() {
        const startData = await this.motivationRepository.find({
            where: {
                id: 1
            }
        })
        return startData;
    }

    async getMotivationData() {
        const response = await fetch(baseUrl);
        var data = await response.json();
        return data;
    }

    async createMotivation() {
        const data = await this.getMotivationData();
        for (let i = 0; i < data.length; i++) {
            await this.motivationRepository.save({
                author: data[i].a,
                text: data[i].q
            })
        }
        return data;
    }

    async getNextMotivation(lastMotivationId: number, user: UsersModel) {
        const nextData = await this.motivationRepository.find({
            where: {
                id: lastMotivationId
            }
        })

        if (!nextData) {
            this.userService.updateLastMotivationId(user, 1);
            return await this.motivationRepository.find({
                where: {
                    id: 1
                }
            })
        }
        this.userService.updateLastMotivationId(user, lastMotivationId);
        console.log('nextData: ', nextData);
        return nextData;
    }

    getIsFavored(user: UsersModel, motivationId: number) {
        const already = user.favoriteMotivationIds?.some(m => m.id === motivationId);
        return already ? true : false;
    }
}
