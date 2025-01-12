import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../config/http-config';

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  console.log(`error occurred: on path ${req.path}`);
  if (err instanceof SyntaxError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Invalid JSON payload passed.',
    });
  }
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
    error: err?.message || 'Unknown error occurred',
  });

  //   next();
};
