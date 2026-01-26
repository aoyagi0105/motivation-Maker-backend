import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post()
  @UseGuards(AccessTokenGuard)
  postToggleFavorite(@Request() req: any, motivationId: number) {
    this.favoritesService.toggleFavorite(req.user.id, motivationId)
  }
}
