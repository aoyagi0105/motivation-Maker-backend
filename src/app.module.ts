import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MotivationModule } from './motivation/motivation.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivationModel } from './motivation/entity/motivations.entity';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FavoritesModule } from './favorites/favorites.module';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [MotivationModule,
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        MotivationModel,
        UsersModel
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    FavoritesModule,
    TranslationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
