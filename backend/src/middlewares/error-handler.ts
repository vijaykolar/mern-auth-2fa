import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../config/http-config';
import { AppError } from '../common/utils/AppError';

export const errorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  console.log(`error occurred: on path ${req.path}`);
  if (error instanceof SyntaxError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Invalid JSON payload passed.',
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
    error: error?.message || 'Unknown error occurred',
  });

  //   next();
};
