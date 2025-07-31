import App from "./services/ExpressApp";
import { PORT } from "./config";
import express from "express";

const StartServer = async () => {
  const app = express();
  //   await dbConnection();
  await App(app);
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
};

StartServer();
