import { Router } from 'express';
import { Path } from '../paths';
import { login } from './auth.controller';

const router = Router();

router.post('/', login);

export default router;