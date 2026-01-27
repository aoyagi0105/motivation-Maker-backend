import { Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, Request } from '@nestjs/common';
import { MotivationService } from './motivation.service';
import { BasicTokenGuard } from 'src/auth/guard/basic-token.guard';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';

@Controller('motivation')
export class MotivationController {
  constructor(private readonly motivationService: MotivationService) { }

  @Get()
  getMotivation() {
    return this.motivationService.getStartMotivationData();
  }

  @Post()
  postMotivation() {
    return this.motivationService.createMotivation();
  }

  @UseGuards(AccessTokenGuard)
  @Get('nextMotivation')
  async getNextMotivation(
    @Query('lastMotivationId', ParseIntPipe) lastMotivationId: number,
    @Request() req,
  ) {
    const nextData = await this.motivationService.getNextMotivation(lastMotivationId, req.user);
    const isFavored = this.motivationService.getIsFavored(req.user, lastMotivationId)

    return {
      nextData,
      isFavored
    }
  }
}
