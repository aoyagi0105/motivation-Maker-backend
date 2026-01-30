import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { MotivationModule } from 'src/motivation/motivation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersModel]),
    JwtModule.register({}),
    UsersModule,
    MotivationModule
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule { }
