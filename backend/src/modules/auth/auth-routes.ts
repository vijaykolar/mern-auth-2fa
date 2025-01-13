import { Router } from 'express';
import { authController } from './auth-module';

const authRouters = Router();

authRouters.post('/register', authController.register);

export { authRouters };
