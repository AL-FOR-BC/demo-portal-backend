import express  from "express"
import { GetBcConfig } from "../Controllers/BcAuthControllers"
import { Authenticate } from "../middlewares";
import { UpdateSettings } from "../Controllers/AdminController";
import { GetSettings } from "../Controllers/AdminController";

const router = express.Router()

// router.use(Authenticate);
router.get('/config', GetBcConfig)
router.get('/settings', GetSettings)
router.put('/settings', UpdateSettings)
// router.post('/login', UserLogin)

export {router as AdminRoutes}

