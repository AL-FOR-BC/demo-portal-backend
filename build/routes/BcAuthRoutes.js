"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBcRoutes = void 0;
var BcAuthControllers_1 = require("../Controllers/BcAuthControllers");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.AuthBcRoutes = router;
router.get("/token", BcAuthControllers_1.AuthToken);
//# sourceMappingURL=BcAuthRoutes.js.map