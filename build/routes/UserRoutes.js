"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var express_1 = __importDefault(require("express"));
var UserControllers_1 = require("../Controllers/UserControllers");
var middlewares_1 = require("../middlewares");
var router = express_1.default.Router();
exports.UserRoutes = router;
// ----------- login ----------
router.post("/login", UserControllers_1.UserLogin);
router.post("/register", UserControllers_1.UserRegister);
// /* ------------------- Authentication --------------------- */
router.use(middlewares_1.Authenticate);
//# sourceMappingURL=UserRoutes.js.map