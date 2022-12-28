import { Router } from 'express';
import { postUser } from './user.controller';
import { jwtGuard } from '../middleware/jwt.guard';
import { roleGuard } from '../middleware/role.guard';

const router = Router();

router.post('/', jwtGuard, roleGuard, postUser);

export default router;
