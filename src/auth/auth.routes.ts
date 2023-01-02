import { Router } from 'express';

import { login, whoami } from './auth.controller';
import { Path } from '../app/paths';

const router = Router();

router.post(Path.Login, login);
router.get(Path.Whoami, whoami);

export default router;
