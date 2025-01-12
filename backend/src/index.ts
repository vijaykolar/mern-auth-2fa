import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/app.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);
console.log(config);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(config.PORT, () => {
  console.log(
    `Server is running on http://localhost:${config.PORT} in ${config.NODE_ENV} mode`
  );
});
