import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post('/toggle')
  @UseGuards(AccessTokenGuard)
  async postToggleFavorite(
    @Request() req: any,
    @Body('motivationId') motivationId: number
  ) {
    const test = await this.favoritesService.toggleFavorite(req.user.id, motivationId);
    return test;
  }
}
