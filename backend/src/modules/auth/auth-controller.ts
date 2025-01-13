import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth-service';
import { asyncHandler } from '../../middlewares/async-handler';
import { HTTP_STATUS } from '../../config/http-config';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      // const { email, password } = req.body;
      // const user = await this.authService.register(email, password);
      res.status(HTTP_STATUS.CREATED).json({
        message: 'User registered successfully!!',
      });
    },
  );
}
