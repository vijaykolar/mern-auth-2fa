import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/app.config";

const BASE_PATH = config.BASE_PATH;

dotenv.config();

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

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/app", (req, res) => {
  res.send("Hello World app");
});

app.listen(config.PORT, () => {
  console.log(
    `Server is running on http://localhost:${config.PORT} in ${config.NODE_ENV} mode`
  );
});
