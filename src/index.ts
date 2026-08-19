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
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
  });
};

StartServer();
