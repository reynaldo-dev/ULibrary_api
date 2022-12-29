import { Router } from 'express';
import { getBooks, postBook } from './book.controller';
import { jwtGuard } from '../middleware/jwt.guard';

const router = Router();

router.get('/', jwtGuard, getBooks);
router.post('/', jwtGuard, postBook);

export default router;
