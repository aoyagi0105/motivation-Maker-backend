import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BearerTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('토큰이 없습니다')
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_SCRET_KEY')
            });
            const user = await this.userService.findUserById({ userId: payload.userId });
            req.tokenType = payload.token;
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException(e);
        }

    }
}

export class AccessTokenGuard extends BearerTokenGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
        const req = context.switchToHttp().getRequest();
        if (req.tokenType !== 'access') {
            throw new UnauthorizedException('access token 이 아닙니다')
        }
        return true;
    }
}

export class RefreshTokenGuard extends BearerTokenGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
        const req = context.switchToHttp().getRequest();
        if (req.type !== 'refresh') {
            throw new UnauthorizedException('refresh token 이 아닙니다')
        }
        return true;
    }
}