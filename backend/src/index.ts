import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config/app-config';
import { connectDB } from './database/database.';
import { errorHandler } from './middlewares/error-handler';
import { asyncHandler } from './middlewares/async-handler';
import { HTTP_STATUS } from './config/http-config';
import { authRouters } from './modules/auth/auth-routes';

const BASE_PATH = config.BASE_PATH;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('dev'));

app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  }),
);

// Routes
app.get(
  BASE_PATH,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // const { email } = req.body;
    // const user = UserModel.find({ email });
    // if (!user) {
    //   return res.status(HTTP_STATUS.NOT_FOUND).json({
    //     message: 'User not found',
    //   });
    // }

    res.status(HTTP_STATUS.OK).json({
      message: 'Hello app!!!',
    });
  }),
);

app.use(`${BASE_PATH}/auth`, authRouters);

app.use(errorHandler);

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT} in ${config.NODE_ENV} mode`);
  connectDB();
});
