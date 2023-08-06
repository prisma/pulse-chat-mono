import { Router }  from 'express';
import * as UserController from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import { SignupSchema, SigninSchema } from '../util/schemas';

const router: Router = Router();

router.post('/signup', validate(SignupSchema), (req, res) => UserController.signup);
router.post('/signin', validate(SigninSchema), (req, res) => UserController.signin);

export default router;