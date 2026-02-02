import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as deepl from 'deepl-node';
import { TRANSLATION_API_KEY } from 'src/common/const/var';

@Injectable()
export class TranslationService {
    constructor(
        private readonly configService: ConfigService
    ) { }


    async getTranslation(phrase: string, targetLang: string) {
        const translationKey = this.configService.getOrThrow<string>(TRANSLATION_API_KEY);
        const deeplClient = new deepl.DeepLClient(translationKey);
        return await deeplClient.translateText(phrase, 'en', targetLang as deepl.TargetLanguageCode);
    }
}
