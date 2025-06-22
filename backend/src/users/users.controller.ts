import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const findUsers = async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query as string, mode: 'insensitive' } },
          { email: { contains: query as string, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Find users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 