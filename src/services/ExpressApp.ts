import cors from "cors";
import path from "path";
import express, { Application } from "express";
import {AdminRoutes, AuthBcRoutes, UserRoutes} from '../routes'

export default async (app: Application) => {
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ extended: true }));
  const imagePath = path.join(__dirname, "../images");
  console.log(imagePath);

  app.use("/images", express.static("../images"));

  app.use(
    cors({
      origin: "*",
    })
  );
  app.use("/api/user", UserRoutes)
  app.use("/api", AuthBcRoutes)
  // app.use("/api/bc", AuthBcRoutes)
  app.use("/api/admin", AdminRoutes)

};
