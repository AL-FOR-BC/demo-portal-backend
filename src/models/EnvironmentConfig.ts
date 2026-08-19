import mongoose, { Schema, Document } from "mongoose";

export interface IEnvironmentConfig extends Document {
  environmentType: string;
  frontendBasePath: string;
}

const EnvironmentConfigSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    environmentType: {
      type: String,
      default: "",
    },
    frontendBasePath: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "environment_configs",
  }
);

export const EnvironmentConfig = mongoose.model<IEnvironmentConfig>(
  "EnvironmentConfig",
  EnvironmentConfigSchema
);
