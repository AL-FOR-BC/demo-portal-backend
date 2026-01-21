import mongoose, { Schema, Document } from "mongoose";

export interface IProjectSetup extends Document {
  name: string;
  color: string;
  logo?: string;
  themeColor?: string;
  companyLogo?: string | null;
  favicon?: string | null;
}

const ProjectSetupSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    themeColor: {
      type: String,
      default: "",
    },
    companyLogo: {
      type: String,
      default: null,
    },
    favicon: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "project_setups",
  }
);

export const ProjectSetup = mongoose.model<IProjectSetup>(
  "ProjectSetup",
  ProjectSetupSchema
);
