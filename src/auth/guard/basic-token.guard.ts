import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "src/common/const/var";

export class BasicTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('토큰이 없습니다')
        }

        try {
            this.jwtService.verify(token, {
                secret: this.configService.get<string>(JWT_SECRET)
            })
            return true;
        } catch {
            throw new UnauthorizedException('Access token 이 만료되었습니다')
        }

    }
}