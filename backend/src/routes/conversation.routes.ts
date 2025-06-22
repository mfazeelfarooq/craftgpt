import { Router } from 'express';
import { getConversations, getMessages, createConversation } from '../conversations/conversations.controller';

const router = Router();

router.get('/', getConversations);
router.post('/', createConversation);
router.get('/:conversationId/messages', getMessages);

export default router; 