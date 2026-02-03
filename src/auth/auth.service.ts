import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/common/const/var';
import { UsersModel } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }


    getAccessAndRefreshToken(user: Pick<UsersModel, 'userId' | 'nickName'>) {
        return {
            access: this.createToken(user, false),
            refresh: this.createToken(user, true)
        }

    }

    createToken(user: Pick<UsersModel, 'userId' | 'nickName'>, isRefresh: boolean) {
        const payload = {
            userId: user.userId,
            nickName: user.nickName,
            token: isRefresh ? 'refresh' : 'access'
        }
        const secretKey = this.configService.get<string>(JWT_SECRET);
        return this.jwtService.sign(
            payload,
            {
                secret: secretKey,
                expiresIn: isRefresh ? 72 : 36
            }
        )
    }
}
