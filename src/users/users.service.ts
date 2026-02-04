import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './entities/user.entity';
import * as bcrypt from "bcrypt";
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { ENV_HASH_ROUNDS_KEY } from 'src/common/const/var';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
    private readonly authService: AuthService,

    private readonly configService: ConfigService,
  ) { }


  async createUser(createUserDto: CreateUserDto) {
    const rounds = this.configService.get<number>(ENV_HASH_ROUNDS_KEY);
    if (!rounds) {
      throw new Error('ENV_HASH_ROUNDS_KEY가 정의되지않았습니다')
    }

    const hash = await bcrypt.hash(
      createUserDto.password,
      Number(rounds)
    )
    const userID = await this.findUserById(createUserDto);
    if (userID) {
      throw new ConflictException('ID is duplicated')
    }

    const nickName = await this.findUserByNickName(createUserDto);
    if (nickName) {
      throw new ConflictException('Nickname is duplicated')
    }

    const user = await this.usersRepository.save({
      userId: createUserDto.userId,
      password: hash,
      nickName: createUserDto.nickName,
      language: createUserDto.language,
    });

    return this.authService.getAccessAndRefreshToken(user);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.findUserById(loginUserDto);
    if (!user) {
      throw new UnauthorizedException('incorrect ID')
    }

    const passwordOK = await bcrypt.compare(loginUserDto.password, user.password);
    if (!passwordOK) {
      throw new UnauthorizedException('inccorrect PW')
    }

    return this.authService.getAccessAndRefreshToken(user);
  }

  async findUserById(userInfo: Pick<UsersModel, 'userId'>) {
    const user = await this.usersRepository.findOne({
      where: {
        userId: userInfo.userId
      },
      loadRelationIds: {
        relations: ['favoriteMotivationIds']
      }
    });
    return user;
  }

  async findUserByNickName(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        nickName: createUserDto.nickName
      }
    });
    return user;
  }

  async updateLastMotivationId(userInfo: Pick<UsersModel, 'userId'>, lastMotivationId: number) {
    await this.usersRepository.update({ userId: userInfo.userId }, { lastMotivationId });
  }

  async updateLanguage(userInfo: Pick<UsersModel, 'userId'>, language: string) {
    return await this.usersRepository.update({ userId: userInfo.userId }, { language })
  }

}
