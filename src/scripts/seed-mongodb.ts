import dotenv from "dotenv";
dotenv.config();

import { connectDB, disconnectDB } from "../utils/MongoDB";
import { BcConfig } from "../models/BcConfig";

type BcSeed = {
  _id: string;
  tenant: string;
  clientId: string;
  clientSecret: string;
  url: string;
  email: string;
  password: string;
  companyId: string;
};

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const buildBcConfig = (id: "1" | "2"): BcSeed => ({
  _id: id,
  tenant: requireEnv(`BC_TENANT_${id}`),
  clientId: requireEnv(`BC_CLIENT_ID_${id}`),
  clientSecret: requireEnv(`BC_CLIENT_SECRET_${id}`),
  url: "",
  email: requireEnv(`BC_EMAIL_${id}`),
  password: requireEnv(`BC_PASSWORD_${id}`),
  companyId: process.env[`BC_COMPANY_ID_${id}`] || "",
});

const seedData = async () => {
  try {
    await connectDB();
    console.log("Seeding BC configs from .env into MongoDB...");

    const configs = [buildBcConfig("1"), buildBcConfig("2")];

    for (const config of configs) {
      await BcConfig.findByIdAndUpdate(config._id, config, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
      console.log(
        `✅ BC Config _id=${config._id} upserted (tenant=${config.tenant}, email=${config.email})`
      );
    }

    console.log("🎉 BC configs seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
};

seedData();
