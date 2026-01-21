import mongoose, { Schema, Document } from "mongoose";

export interface IAppSetupConfig extends Document {
  baseUrl: string;
  defaultCompany: string;
  ehubUsername: string;
  ehubPassword: string;
  lastModified?: string;
  modifiedBy?: string;
}

const AppSetupSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    baseUrl: {
      type: String,
      default: "",
    },
    defaultCompany: {
      type: String,
      default: "",
    },
    ehubUsername: {
      type: String,
      default: "",
    },
    ehubPassword: {
      type: String,
      default: "",
    },
    lastModified: {
      type: String,
      default: "",
    },
    modifiedBy: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "app_setups",
  }
);

export const AppSetupConfig = mongoose.model<IAppSetupConfig>(
  "AppSetupConfig",
  AppSetupSchema
);
