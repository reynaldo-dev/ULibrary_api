import { Router } from 'express';
import { getUsers, postUser } from './user.controller';
import { jwtGuard } from '../middleware/jwt.guard';
import { roleGuard } from '../middleware/role.guard';

const router = Router();

router.post('/', jwtGuard, roleGuard, postUser);
router.get('/', jwtGuard, getUsers);

export default router;
