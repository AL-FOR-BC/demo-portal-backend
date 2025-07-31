import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  allowCompanyChange: boolean;
  companyLogo?: string;
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
