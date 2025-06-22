import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
export declare class AiService {
    private configService;
    private cacheManager;
    private openai;
    constructor(configService: ConfigService, cacheManager: Cache);
    grammarCorrect(text: string): Promise<string>;
    suggestQuickReplies(context: {
        role: 'user' | 'assistant';
        content: string;
    }[]): Promise<string[]>;
    summarizeConversation(messages: {
        content: string;
    }[]): Promise<string>;
}
