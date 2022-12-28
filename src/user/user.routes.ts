import { Router } from 'express';
import { postUser } from './user.controller';

const router = Router();

router.post('/', postUser);

export default router;
