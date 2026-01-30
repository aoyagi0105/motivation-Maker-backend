import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { UsersService } from 'src/users/users.service';

@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly usersService: UsersService
  ) { }

  @Post('/toggle')
  @UseGuards(AccessTokenGuard)
  async postToggleFavorite(
    @Request() req: any,
    @Body('motivationId') motivationId: number
  ) {
    const toggle = await this.favoritesService.toggleFavorite(req.user, motivationId);
    return toggle;
  }

  @Get('/favoriteMotivationIds')
  @UseGuards(AccessTokenGuard)
  async getFavoriteMotivationIds(
    @Request() req: any
  ) {
    return await this.favoritesService.getFavoriteMotivationIds(req.user);
  }
}
