import { Request, Response } from "express";
import { ADMIN_PIN } from "../config";
import {
  AppSetupConfig,
  EnvironmentConfig,
  BcConfig,
  ProjectSetup,
} from "../models";

export const VerifyAdminPin = async (req: Request, res: Response) => {
  try {
    const { pin } = req.body ?? {};

    if (!pin) {
      return res.status(400).json({
        success: false,
        message: "PIN is required",
      });
    }

    if (pin === ADMIN_PIN) {
      return res.json({
        success: true,
        message: "PIN verified successfully",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid PIN",
    });
  } catch (error) {
    console.error("Error verifying admin PIN:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify PIN",
    });
  }
};

export const GetAppSetupConfig = async (req: Request, res: Response) => {
  try {
    let config = await AppSetupConfig.findOne({ _id: "1" });
    if (!config) {
      config = await AppSetupConfig.create({ _id: "1" });
    }
    return res.json(config);
  } catch (error) {
    console.error("Error fetching app setup config:", error);
    return res.status(500).json({ error: "Failed to fetch app setup config" });
  }
};

export const UpdateAppSetupConfig = async (req: Request, res: Response) => {
  try {
    const updateData = {
      baseUrl: req.body?.baseUrl ?? "",
      defaultCompany: req.body?.defaultCompany ?? "",
      ehubUsername: req.body?.ehubUsername ?? "",
      ehubPassword: req.body?.ehubPassword ?? "",
      lastModified: req.body?.lastModified ?? new Date().toISOString(),
      modifiedBy: req.body?.modifiedBy ?? "",
    };

    const config = await AppSetupConfig.findByIdAndUpdate("1", updateData, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return res.json(config);
  } catch (error) {
    console.error("Error updating app setup config:", error);
    return res.status(500).json({ error: "Failed to update app setup config" });
  }
};

export const GetEnvironmentConfig = async (req: Request, res: Response) => {
  try {
    let config = await EnvironmentConfig.findOne({ _id: "1" });
    if (!config) {
      config = await EnvironmentConfig.create({ _id: "1" });
    }
    return res.json(config);
  } catch (error) {
    console.error("Error fetching environment config:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch environment config" });
  }
};

export const UpdateEnvironmentConfig = async (req: Request, res: Response) => {
  try {
    const updateData = {
      environmentType: req.body?.environmentType ?? "",
      frontendBasePath: req.body?.frontendBasePath ?? "",
    };

    const config = await EnvironmentConfig.findByIdAndUpdate("1", updateData, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return res.json(config);
  } catch (error) {
    console.error("Error updating environment config:", error);
    return res
      .status(500)
      .json({ error: "Failed to update environment config" });
  }
};

export const GetBcConfigAdmin = async (req: Request, res: Response) => {
  try {
    let config = await BcConfig.findOne({ _id: "1" });
    if (!config) {
      config = await BcConfig.create({
        _id: "1",
        tenant: "",
        clientId: "",
        clientSecret: "",
        url: "",
        email: "",
        password: "",
        companyId: "",
      });
    }
    return res.json(config);
  } catch (error) {
    console.error("Error fetching BC config:", error);
    return res.status(500).json({ error: "Failed to fetch BC config" });
  }
};

export const UpdateBcConfig = async (req: Request, res: Response) => {
  try {
    const updateData = {
      tenant: req.body?.tenant ?? "",
      clientId: req.body?.clientId ?? "",
      clientSecret: req.body?.clientSecret ?? "",
      url: req.body?.url ?? "",
      email: req.body?.email ?? "",
      password: req.body?.password ?? "",
      companyId: req.body?.companyId ?? "",
    };

    const config = await BcConfig.findByIdAndUpdate("1", updateData, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return res.json(config);
  } catch (error) {
    console.error("Error updating BC config:", error);
    return res.status(500).json({ error: "Failed to update BC config" });
  }
};

export const GetProjectSetups = async (req: Request, res: Response) => {
  try {
    let setups = await ProjectSetup.find().sort({ _id: 1 });
    if (setups.length === 0) {
      const defaultSetup = await ProjectSetup.create({
        _id: "1",
        name: "",
        color: "",
        logo: "",
        themeColor: "",
        companyLogo: null,
        favicon: null,
      });
      setups = [defaultSetup];
    }
    return res.json(setups);
  } catch (error) {
    console.error("Error fetching project setups:", error);
    return res.status(500).json({ error: "Failed to fetch project setups" });
  }
};

export const UpdateProjectSetup = async (req: Request, res: Response) => {
  try {
    const setupId = req.params.id || req.body?.id;
    if (!setupId) {
      return res.status(400).json({ error: "Project setup id is required" });
    }

    const updateData = {
      name: req.body?.name ?? "",
      color: req.body?.color ?? "",
      logo: req.body?.logo ?? "",
      themeColor: req.body?.themeColor ?? "",
      companyLogo: req.body?.companyLogo ?? null,
      favicon: req.body?.favicon ?? null,
    };

    const setup = await ProjectSetup.findByIdAndUpdate(setupId, updateData, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return res.json(setup);
  } catch (error) {
    console.error("Error updating project setup:", error);
    return res.status(500).json({ error: "Failed to update project setup" });
  }
};
