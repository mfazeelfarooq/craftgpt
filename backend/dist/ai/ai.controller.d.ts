import { AiService } from './ai.service';
import { PrismaService } from 'src/prisma/prisma.service';
declare class GrammarDto {
    text: string;
}
export declare class AiController {
    private readonly aiService;
    private readonly prisma;
    constructor(aiService: AiService, prisma: PrismaService);
    correctGrammar(grammarDto: GrammarDto): Promise<string>;
    getQuickReplies(conversationId: string): Promise<string[]>;
    getSummary(conversationId: string): Promise<string>;
}
export {};
