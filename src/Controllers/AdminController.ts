import { Settings } from "../models/Settings";
import { Request, Response } from "express";

// Interface for settings data
interface SettingsData {
  allowCompanyChange?: boolean;
  themeColor?: string;
  companyLogo?: string | null;
}

export const GetSettings = async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne({ _id: "1" });

    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = await Settings.create({
        _id: "1",
        allowCompanyChange: false,
        themeColor: "#094BAC",
        companyLogo: null,
      });
      return res.json(defaultSettings);
    }

    // Debug logging for retrieved data
    if (settings.companyLogo) {
      console.log(
        `📤 Retrieved logo data length: ${settings.companyLogo.length} characters`
      );
      console.log(
        `📤 Retrieved logo preview: ${settings.companyLogo.substring(
          0,
          100
        )}...`
      );
    }

    return res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return res.status(500).json({ error: "Failed to fetch settings" });
  }
};

export const UpdateSettings = async (req: Request, res: Response) => {
  try {
    const { allowCompanyChange, themeColor, companyLogo }: SettingsData =
      req.body;

    // Debug logging for logo data
    if (companyLogo && typeof companyLogo === "string") {
      console.log(`📊 Logo data length: ${companyLogo.length} characters`);
      console.log(`📊 Logo data preview: ${companyLogo.substring(0, 100)}...`);
    }

    // Validate themeColor format (hex color)
    if (themeColor && !/^#[0-9A-F]{6}$/i.test(themeColor)) {
      return res.status(400).json({
        error: "Invalid theme color format. Use hex color (e.g., #094BAC)",
      });
    }

    // Validate companyLogo (if provided, should be base64 or null)
    if (companyLogo !== null && companyLogo !== undefined) {
      if (typeof companyLogo !== "string") {
        return res
          .status(400)
          .json({ error: "Company logo must be a string or null" });
      }

      // Check if it's a valid base64 data URL
      if (!companyLogo.startsWith("data:image/")) {
        return res
          .status(400)
          .json({ error: "Company logo must be a valid base64 data URL" });
      }

      // Check file size (5MB limit)
      const base64Data = companyLogo.split(",")[1];
      if (base64Data) {
        const sizeInBytes = Math.ceil((base64Data.length * 3) / 4);
        const sizeInMB = sizeInBytes / (1024 * 1024);
        if (sizeInMB > 5) {
          return res
            .status(400)
            .json({ error: "Company logo size must be less than 5MB" });
        }
      }

      // Validate image format
      const allowedFormats = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
      ];
      const format = companyLogo.match(/data:([^;]+)/)?.[1];
      if (format && !allowedFormats.includes(format)) {
        return res
          .status(400)
          .json({ error: "Company logo must be PNG, JPG, or SVG format" });
      }
    }

    // Check if settings exist, if not create them
    const existingSettings = await Settings.findOne({ _id: "1" });

    let settings;
    if (existingSettings) {
      // Only update fields that are provided
      const updateData: any = {};
      if (allowCompanyChange !== undefined)
        updateData.allowCompanyChange = allowCompanyChange;
      if (themeColor !== undefined) updateData.themeColor = themeColor;
      if (companyLogo !== undefined) updateData.companyLogo = companyLogo;

      console.log(
        `💾 Saving logo data with length: ${
          companyLogo?.length || 0
        } characters`
      );

      settings = await Settings.findByIdAndUpdate("1", updateData, {
        new: true,
      });
    } else {
      settings = await Settings.create({
        _id: "1",
        allowCompanyChange: allowCompanyChange ?? false,
        themeColor: themeColor ?? "#094BAC",
        companyLogo,
      });
    }

    // Debug logging for saved data
    if (settings.companyLogo) {
      console.log(
        `✅ Saved logo data length: ${settings.companyLogo.length} characters`
      );
      console.log(
        `✅ Saved logo preview: ${settings.companyLogo.substring(0, 100)}...`
      );
    }

    return res.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return res.status(500).json({ error: "Failed to update settings" });
  }
};
