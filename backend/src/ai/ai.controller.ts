import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import redisClient from '../lib/redis';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getCachedOrFetch = async (key: string, fetcher: () => Promise<any>, ttl: number) => {
    const cached = await redisClient.get(key);
    if (cached) {
        return JSON.parse(cached);
    }
    const data = await fetcher();
    await redisClient.setEx(key, ttl, JSON.stringify(data));
    return data;
};

export const getQuickReplies = async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const cacheKey = `quick-replies:${conversationId}`;

    try {
        const replies = await getCachedOrFetch(cacheKey, async () => {
            const messages = await prisma.message.findMany({
                where: { conversationId },
                orderBy: { createdAt: 'asc' },
                take: 10,
            });
            const prompt = `Based on this conversation, suggest three concise, relevant, and distinct quick replies. Do not include any introductory text.
            \n\n${messages.map(m => m.content).join('\n')}\n\nQuick Replies:`;
            
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                n: 1,
            });
            return completion.choices[0].message.content.split('\n');
        }, 300); // Cache for 5 minutes

        res.json(replies);
    } catch (error) {
        console.error('Get quick replies error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSummary = async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const cacheKey = `summary:${conversationId}`;

    try {
        const summary = await getCachedOrFetch(cacheKey, async () => {
            const messages = await prisma.message.findMany({
                where: { conversationId },
                orderBy: { createdAt: 'asc' },
            });
            const prompt = `Summarize the following conversation concisely.\n\n${messages.map(m => m.content).join('\n')}\n\nSummary:`;
            
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            });
            return completion.choices[0].message.content;
        }, 3600); // Cache for 1 hour

        res.json({ summary });
    } catch (error) {
        console.error('Get summary error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const checkGrammar = async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    const cacheKey = `grammar:${text}`;

    try {
        const correction = await getCachedOrFetch(cacheKey, async () => {
            const prompt = `Correct the grammar of the following text. If it is correct, return the original text.
            \n\nOriginal Text: ${text}\n\nCorrected Text:`;
            
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            });
            return completion.choices[0].message.content;
        }, 86400); // Cache for 24 hours

        res.json({ correction });
    } catch (error) {
        console.error('Check grammar error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
} 