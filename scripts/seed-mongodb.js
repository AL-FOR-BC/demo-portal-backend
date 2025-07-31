"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MongoDB_1 = require("../src/utils/MongoDB");
var models_1 = require("../src/models");
var seedData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var usersData, settingsData, bcConfigsData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, 9, 11]);
                return [4 /*yield*/, (0, MongoDB_1.connectDB)()];
            case 1:
                _a.sent();
                console.log("Starting data seeding to MongoDB...");
                // Clear existing data
                return [4 /*yield*/, models_1.User.deleteMany({})];
            case 2:
                // Clear existing data
                _a.sent();
                return [4 /*yield*/, models_1.Settings.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, models_1.BcConfig.deleteMany({})];
            case 4:
                _a.sent();
                console.log("Cleared existing data");
                usersData = [
                    {
                        email: "admin@example.com",
                        password: "$2b$10$8/Cnxz9YCRn0P9JT3RJtFOA2K4QUy9Snqu70/9Hx0M4ZepEod57LK",
                        salt: "$2b$10$8/Cnxz9YCRn0P9JT3RJtFO",
                        verified: true,
                        isAdmin: true,
                    },
                    {
                        email: "user@example.com",
                        password: "$2b$10$YCYay71axWfW5Vi5oxMGputXI60N/oOSjMaxoNFSwLGnDkGPMuyD2",
                        salt: "$2b$10$YCYay71axWfW5Vi5oxMGpu",
                        verified: true,
                        isAdmin: false,
                    },
                ];
                return [4 /*yield*/, models_1.User.insertMany(usersData)];
            case 5:
                _a.sent();
                console.log("✅ Users seeded successfully");
                settingsData = {
                    _id: "1",
                    allowCompanyChange: true,
                    themeColor: "#094BAC",
                };
                return [4 /*yield*/, models_1.Settings.create(settingsData)];
            case 6:
                _a.sent();
                console.log("✅ Settings seeded successfully");
                bcConfigsData = [
                    {
                        _id: "1",
                        tenant: process.env.BC_TENANT_1 || "your-tenant-id-1",
                        clientId: process.env.BC_CLIENT_ID_1 || "your-client-id-1",
                        clientSecret: process.env.BC_CLIENT_SECRET_1 || "your-client-secret-1",
                        url: "",
                        email: process.env.BC_EMAIL_1 || "your-email-1",
                        password: process.env.BC_PASSWORD_1 || "your-password-1",
                        companyId: process.env.BC_COMPANY_ID_1 || "your-company-id-1",
                    },
                    {
                        _id: "2",
                        tenant: process.env.BC_TENANT_2 || "your-tenant-id-2",
                        clientId: process.env.BC_CLIENT_ID_2 || "your-client-id-2",
                        clientSecret: process.env.BC_CLIENT_SECRET_2 || "your-client-secret-2",
                        url: "",
                        email: process.env.BC_EMAIL_2 || "your-email-2",
                        password: process.env.BC_PASSWORD_2 || "your-password-2",
                        companyId: process.env.BC_COMPANY_ID_2 || "your-company-id-2",
                    },
                ];
                return [4 /*yield*/, models_1.BcConfig.insertMany(bcConfigsData)];
            case 7:
                _a.sent();
                console.log("✅ BC Configs seeded successfully");
                console.log("🎉 All data seeded successfully!");
                console.log("📝 Note: BC Configs use environment variables. Set them in your .env file for production.");
                return [3 /*break*/, 11];
            case 8:
                error_1 = _a.sent();
                console.error("❌ Seeding error:", error_1);
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, (0, MongoDB_1.disconnectDB)()];
            case 10:
                _a.sent();
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
seedData();
//# sourceMappingURL=seed-mongodb.js.map