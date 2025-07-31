import cors from "cors";
import path from "path";
import express, { Application } from "express";
import { AdminRoutes, AuthBcRoutes, UserRoutes } from "../routes";

export default async (app: Application) => {
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ extended: true }));
  const imagePath = path.join(__dirname, "../images");
  console.log(imagePath);

  app.use("/images", express.static("../images"));

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
  });

  app.use(
    cors({
      origin: [
        "https://demo-portal-backend-h13a.onrender.com",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://localhost:8080",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );
  app.use("/api/user", UserRoutes);
  app.use("/api", AuthBcRoutes);
  // app.use("/api/bc", AuthBcRoutes)
  app.use("/api/admin", AdminRoutes);
};
