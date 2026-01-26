import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guard/bearer-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('getAccessToken')
  @UseGuards(RefreshTokenGuard)
  postAccess(
    @Request() req,
  ) {
    return this.authService.createToken(req.user, false)
  }

}
