import { Controller, Get, ParseIntPipe, Post, Query, UseGuards, Request, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';
import { MotivationService } from './motivation.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { TranslationService } from 'src/translation/translation.service';

@Controller('motivation')
export class MotivationController {
  constructor(
    private readonly motivationService: MotivationService,
    private readonly translationService: TranslationService
  ) { }

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
    @Request() req,
    @Query('lastMotivationId', ParseIntPipe) lastMotivationId: number,
    @Query('isMotivationScreen', new DefaultValuePipe(false), ParseBoolPipe) isMotivationScreen: boolean,
    @Query('language') language: string,
  ) {
    const nextData = await this.motivationService.getNextMotivation(lastMotivationId, req.user, isMotivationScreen);
    const isFavored = this.motivationService.getIsFavored(req.user, lastMotivationId);
    const author = await this.translationService.getTranslation(nextData[0].author, language);
    const text = await this.translationService.getTranslation(nextData[0].text, language);

    return {
      author,
      text,
      isFavored
    }
  }
}
