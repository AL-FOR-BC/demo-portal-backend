import express  from "express"
import { GetBcConfig } from "../Controllers/BcAuthControllers"
import { Authenticate } from "../middlewares";
import { UpdateSettings, GetSettings } from "../Controllers/AdminController";
import {
  VerifyAdminPin,
  GetAppSetupConfig,
  UpdateAppSetupConfig,
  GetEnvironmentConfig,
  UpdateEnvironmentConfig,
  GetBcConfigAdmin,
  UpdateBcConfig,
  GetProjectSetups,
  UpdateProjectSetup,
} from "../Controllers/AdminConfigController";

const router = express.Router()

// router.use(Authenticate);
router.get('/config', GetBcConfig)
router.get('/settings', GetSettings)
router.put('/settings', UpdateSettings)
router.put('/setting', UpdateSettings)
router.post('/verify-pin', VerifyAdminPin)
router.get('/app-setup', GetAppSetupConfig)
router.put('/app-setup', UpdateAppSetupConfig)
router.get('/bc-config', GetBcConfigAdmin)
router.put('/bc-config', UpdateBcConfig)
router.get('/environment-config', GetEnvironmentConfig)
router.put('/environment-config', UpdateEnvironmentConfig)
router.get('/project-setup', GetProjectSetups)
router.put('/project-setup/:id', UpdateProjectSetup)
router.put('/project-setup', UpdateProjectSetup)
// router.post('/login', UserLogin)

export {router as AdminRoutes}

