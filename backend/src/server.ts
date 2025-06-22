import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import conversationRoutes from './routes/conversation.routes';
import aiRoutes from './routes/ai.routes';
import { authMiddleware } from './middlewares/auth.middleware';
import { setupSocket } from './lib/socket';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
}));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('ChatCraftAI API is running!');
});

app.use('/auth', authRoutes);
app.use('/users', authMiddleware, userRoutes);
app.use('/conversations', authMiddleware, conversationRoutes);
app.use('/ai', authMiddleware, aiRoutes);

setupSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 