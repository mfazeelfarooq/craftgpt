import { Server, Socket } from 'socket.io';
import prisma from './prisma';

interface MessagePayload {
    conversationId: string;
    content: string;
    senderId: string;
}

export const setupSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on('joinConversation', (conversationId: string) => {
            socket.join(conversationId);
            console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
        });

        socket.on('sendMessage', async (payload: MessagePayload) => {
            try {
                const message = await prisma.message.create({
                    data: {
                        content: payload.content,
                        conversationId: payload.conversationId,
                        senderId: payload.senderId,
                    },
                });

                io.to(payload.conversationId).emit('newMessage', message);
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
}; 