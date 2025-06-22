import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
interface JoinPayload {
    conversationId: string;
}
interface MessagePayload {
    content: string;
    conversationId: string;
    senderId: string;
}
export declare class ChatGateway {
    private readonly chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoin(payload: JoinPayload, client: Socket): void;
    handleMessage(payload: MessagePayload): Promise<void>;
}
export {};
