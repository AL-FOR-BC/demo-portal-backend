import { Settings } from "../models/Settings";
import { Request, Response } from "express";

// Interface for settings data
interface SettingsData {
  allowCompanyChange?: boolean;
  themeColor?: string;
  companyLogo?: string | null;
  favicon?: string | null;
  shortcutDimCode1?: string | null;
  shortcutDimCode2?: string | null;
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
        favicon: null,
        shortcutDimCode1: "",
        shortcutDimCode2: "",
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
    const {
      allowCompanyChange,
      themeColor,
      companyLogo,
      favicon,
      shortcutDimCode1,
      shortcutDimCode2,
    }: SettingsData = req.body;

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

    // Validate favicon (if provided, should be base64 or null)
    if (favicon !== null && favicon !== undefined) {
      if (typeof favicon !== "string") {
        return res
          .status(400)
          .json({ error: "Favicon must be a string or null" });
      }

      if (!favicon.startsWith("data:image/")) {
        return res
          .status(400)
          .json({ error: "Favicon must be a valid base64 data URL" });
      }

      const base64Data = favicon.split(",")[1];
      if (base64Data) {
        const sizeInBytes = Math.ceil((base64Data.length * 3) / 4);
        const sizeInMB = sizeInBytes / (1024 * 1024);
        if (sizeInMB > 5) {
          return res
            .status(400)
            .json({ error: "Favicon size must be less than 5MB" });
        }
      }

      const allowedFormats = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/x-icon",
        "image/vnd.microsoft.icon",
      ];
      const format = favicon.match(/data:([^;]+)/)?.[1];
      if (format && !allowedFormats.includes(format)) {
        return res.status(400).json({
          error: "Favicon must be PNG, JPG, SVG, or ICO format",
        });
      }
    }

    if (
      shortcutDimCode1 !== undefined &&
      shortcutDimCode1 !== null &&
      typeof shortcutDimCode1 !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Shortcut dimension code 1 must be a string or null" });
    }

    if (
      shortcutDimCode2 !== undefined &&
      shortcutDimCode2 !== null &&
      typeof shortcutDimCode2 !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Shortcut dimension code 2 must be a string or null" });
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
      if (favicon !== undefined) updateData.favicon = favicon;
      if (shortcutDimCode1 !== undefined)
        updateData.shortcutDimCode1 = shortcutDimCode1;
      if (shortcutDimCode2 !== undefined)
        updateData.shortcutDimCode2 = shortcutDimCode2;

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
        favicon: favicon ?? null,
        shortcutDimCode1: shortcutDimCode1 ?? "",
        shortcutDimCode2: shortcutDimCode2 ?? "",
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
