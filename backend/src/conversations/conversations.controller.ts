import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getConversations = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { id: userId },
        },
      },
      include: {
        participants: {
          select: { id: true, username: true, email: true },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
    res.json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createConversation = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { recipientId } = req.body;

    if (!recipientId) {
        return res.status(400).json({ message: 'Recipient ID is required' });
    }

    if (userId === recipientId) {
        return res.status(400).json({ message: 'Cannot create a conversation with yourself' });
    }

    try {
        const existingConversation = await prisma.conversation.findFirst({
            where: {
                AND: [
                    { participants: { some: { id: userId } } },
                    { participants: { some: { id: recipientId } } }
                ]
            }
        });

        if (existingConversation) {
            return res.status(200).json(existingConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                participants: {
                    connect: [{ id: userId }, { id: recipientId }],
                },
            },
            include: {
                participants: {
                    select: { id: true, username: true, email: true },
                },
            },
        });
        res.status(201).json(newConversation);
    } catch (error) {
        console.error('Create conversation error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
} 