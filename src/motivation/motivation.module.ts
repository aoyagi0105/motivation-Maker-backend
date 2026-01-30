import { Module } from '@nestjs/common';
import { MotivationService } from './motivation.service';
import { MotivationController } from './motivation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivationModel } from './entity/motivations.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { TranslationModule } from 'src/translation/translation.module';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      MotivationModel
    ]),
    UsersModule,
    TranslationModule
  ],
  controllers: [MotivationController],
  providers: [MotivationService],
  exports: [MotivationService]
})
export class MotivationModule { }
