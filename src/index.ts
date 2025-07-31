import dotenv from "dotenv";
dotenv.config();

import App from "./services/ExpressApp";
import { PORT } from "./config";
import { connectDB } from "./utils/MongoDB";
import express from "express";

const StartServer = async () => {
  const app = express();
  await connectDB();
  await App(app);
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
};

StartServer();
