import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  allowCompanyChange: boolean;
  companyLogo?: string;
  favicon?: string | null;
  shortcutDimCode1?: string | null;
  shortcutDimCode2?: string | null;
  themeColor: string;
}

const SettingsSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    allowCompanyChange: {
      type: Boolean,
      default: false,
    },
    companyLogo: {
      type: String,
      required: false,
    },
    favicon: {
      type: String,
      required: false,
      default: null,
    },
    shortcutDimCode1: {
      type: String,
      required: false,
      default: "",
    },
    shortcutDimCode2: {
      type: String,
      required: false,
      default: "",
    },
    themeColor: {
      type: String,
      default: "#094BAC",
    },
  },
  {
    timestamps: true,
    collection: "settings",
  }
);

export const Settings = mongoose.model<ISettings>("Settings", SettingsSchema);
