import { Router } from 'express';
import { getQuickReplies, getSummary, checkGrammar } from '../ai/ai.controller';

const router = Router();

router.get('/:conversationId/quick-replies', getQuickReplies);
router.get('/:conversationId/summary', getSummary);
router.post('/check-grammar', checkGrammar);

export default router; 