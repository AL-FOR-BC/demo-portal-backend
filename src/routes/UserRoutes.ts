import express from "express"
import {UserLogin, UserRegister} from "../Controllers/UserControllers";
import {Authenticate} from "../middlewares";

const router = express.Router();

// ----------- login ----------
router.post("/login", UserLogin)
router.post("/register", UserRegister)
// /* ------------------- Authentication --------------------- */
router.use(Authenticate);

export {router as UserRoutes}