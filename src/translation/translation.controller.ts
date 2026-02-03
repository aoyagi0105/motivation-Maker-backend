import { Controller, Get, Query } from '@nestjs/common';
import { TranslationService } from './translation.service';


@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) { }


}
