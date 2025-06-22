import { ConversationsService } from './conversations.service';
declare class CreateConversationDto {
    otherUserId: string;
}
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    findAllForUser(req: any): Promise<any>;
    findMessagesForConversation(id: string): Promise<any>;
    create(createConversationDto: CreateConversationDto, req: any): Promise<any>;
}
export {};
