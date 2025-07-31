import {AuthToken} from "../Controllers/BcAuthControllers";
import express  from "express"

const router = express.Router()


router.get("/token", AuthToken)



export {router as AuthBcRoutes}