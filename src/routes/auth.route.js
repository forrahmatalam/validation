import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { registerValidation } from '../validators/auth.validator.js';


const router = Router();



router.post('/register',
registerValidation,authController);

export default router;
