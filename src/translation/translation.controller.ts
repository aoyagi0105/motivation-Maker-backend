import { Controller, Get, Query } from '@nestjs/common';
import { TranslationService } from './translation.service';


@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) { }

  @Get()
  async getTranslation(
    @Query('phrase') phrase: string,
    @Query('targetLang') targetLang: string
  ) {
    return await this.translationService.getTranslation(phrase, targetLang)
  }
}
