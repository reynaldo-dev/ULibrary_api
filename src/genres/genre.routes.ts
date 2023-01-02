import { Router } from 'express';
import { getGenres } from './genre.controller';
import { jwtGuard } from '../middleware/jwt.guard';

const router = Router();

router.get('/', jwtGuard, getGenres);

export default router;
