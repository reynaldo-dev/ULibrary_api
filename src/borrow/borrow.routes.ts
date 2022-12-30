import { Router } from 'express';
import { getBorrows, postBorrow, putBorrow } from './borrow.controller';
import { jwtGuard } from '../middleware/jwt.guard';
const router = Router();

router.get('/', jwtGuard, getBorrows);
router.post('/', jwtGuard, postBorrow);
router.put('/', jwtGuard, putBorrow);
export default router;
