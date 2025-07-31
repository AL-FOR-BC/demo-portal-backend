import dotenv from "dotenv";
dotenv.config();

import { connectDB, disconnectDB } from "../src/utils/MongoDB";
import { User, Settings, BcConfig } from "../src/models";

const seedData = async () => {
  try {
    await connectDB();

    console.log("Starting data seeding to MongoDB...");

    // Clear existing data
    await User.deleteMany({});
    await Settings.deleteMany({});
    await BcConfig.deleteMany({});

    console.log("Cleared existing data");

    // Seed Users (sample data without sensitive info)
    const usersData = [
      {
        email: "admin@example.com",
        password:
          "$2b$10$8/Cnxz9YCRn0P9JT3RJtFOA2K4QUy9Snqu70/9Hx0M4ZepEod57LK",
        salt: "$2b$10$8/Cnxz9YCRn0P9JT3RJtFO",
        verified: true,
        isAdmin: true,
      },
      {
        email: "user@example.com",
        password:
          "$2b$10$YCYay71axWfW5Vi5oxMGputXI60N/oOSjMaxoNFSwLGnDkGPMuyD2",
        salt: "$2b$10$YCYay71axWfW5Vi5oxMGpu",
        verified: true,
        isAdmin: false,
      },
    ];

    await User.insertMany(usersData);
    console.log("✅ Users seeded successfully");

    // Seed Settings
    const settingsData = {
      _id: "1",
      allowCompanyChange: true,
      themeColor: "#094BAC",
    };

    await Settings.create(settingsData);
    console.log("✅ Settings seeded successfully");

    // Seed BC Configs (with placeholder data)
    const bcConfigsData = [
      {
        _id: "1",
        tenant: process.env.BC_TENANT_1 || "your-tenant-id-1",
        clientId: process.env.BC_CLIENT_ID_1 || "your-client-id-1",
        clientSecret: process.env.BC_CLIENT_SECRET_1 || "your-client-secret-1",
        url: "",
        email: process.env.BC_EMAIL_1 || "your-email-1",
        password: process.env.BC_PASSWORD_1 || "your-password-1",
        companyId: process.env.BC_COMPANY_ID_1 || "your-company-id-1",
      },
      {
        _id: "2",
        tenant: process.env.BC_TENANT_2 || "your-tenant-id-2",
        clientId: process.env.BC_CLIENT_ID_2 || "your-client-id-2",
        clientSecret: process.env.BC_CLIENT_SECRET_2 || "your-client-secret-2",
        url: "",
        email: process.env.BC_EMAIL_2 || "your-email-2",
        password: process.env.BC_PASSWORD_2 || "your-password-2",
        companyId: process.env.BC_COMPANY_ID_2 || "your-company-id-2",
      },
    ];

    await BcConfig.insertMany(bcConfigsData);
    console.log("✅ BC Configs seeded successfully");

    console.log("🎉 All data seeded successfully!");
    console.log(
      "📝 Note: BC Configs use environment variables. Set them in your .env file for production."
    );
  } catch (error) {
    console.error("❌ Seeding error:", error);
  } finally {
    await disconnectDB();
  }
};

seedData();
