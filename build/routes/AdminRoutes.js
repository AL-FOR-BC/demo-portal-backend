"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
var express_1 = __importDefault(require("express"));
var BcAuthControllers_1 = require("../Controllers/BcAuthControllers");
var AdminController_1 = require("../Controllers/AdminController");
var AdminController_2 = require("../Controllers/AdminController");
var router = express_1.default.Router();
exports.AdminRoutes = router;
// router.use(Authenticate);
router.get('/config', BcAuthControllers_1.GetBcConfig);
router.get('/settings', AdminController_2.GetSettings);
router.put('/settings', AdminController_1.UpdateSettings);
//# sourceMappingURL=AdminRoutes.js.map