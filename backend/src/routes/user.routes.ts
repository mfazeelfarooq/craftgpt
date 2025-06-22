import { Router } from 'express';
import { findUsers } from '../users/users.controller';

const router = Router();

router.get('/', findUsers);

export default router; 