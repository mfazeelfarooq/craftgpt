import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    createMessage(senderId: string, conversationId: string, content: string): Promise<any>;
}
