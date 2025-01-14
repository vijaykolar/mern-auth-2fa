import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth-service';
import { asyncHandler } from '../../middlewares/async-handler';
import { HTTP_STATUS } from '../../config/http-config';
import { registerSchema } from '../../common/validators/auth-validator';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      // const { email, password } = req.body;
      // const user = await this.authService.register(email, password);
      const userAgent = req.headers['user-agent'];
      const body = registerSchema.parse({
        ...req.body,
        userAgent,
      });

      const { user } = await this.authService.register(body);
      res.status(HTTP_STATUS.CREATED).json({
        message: 'User registered successfully!',
        data: user,
      });
    },
  );
}
