import { PrismaService } from '../prisma/prisma.service';
export declare class ConversationsService {
    private prisma;
    constructor(prisma: PrismaService);
    createOneToOne(userId: string, otherUserId: string): Promise<any>;
    getConversationsForUser(userId: string): Promise<any>;
    getMessagesForConversation(conversationId: string): Promise<any>;
}
