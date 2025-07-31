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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSettings = exports.GetSettings = void 0;
var Settings_1 = require("../models/Settings");
var GetSettings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var settings, defaultSettings, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Settings_1.Settings.findOne({ _id: "1" })];
            case 1:
                settings = _a.sent();
                if (!!settings) return [3 /*break*/, 3];
                return [4 /*yield*/, Settings_1.Settings.create({
                        _id: "1",
                        allowCompanyChange: false,
                        themeColor: "#094BAC",
                        companyLogo: null,
                    })];
            case 2:
                defaultSettings = _a.sent();
                return [2 /*return*/, res.json(defaultSettings)];
            case 3:
                // Debug logging for retrieved data
                if (settings.companyLogo) {
                    console.log("\uD83D\uDCE4 Retrieved logo data length: ".concat(settings.companyLogo.length, " characters"));
                    console.log("\uD83D\uDCE4 Retrieved logo preview: ".concat(settings.companyLogo.substring(0, 100), "..."));
                }
                return [2 /*return*/, res.json(settings)];
            case 4:
                error_1 = _a.sent();
                console.error("Error fetching settings:", error_1);
                return [2 /*return*/, res.status(500).json({ error: "Failed to fetch settings" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.GetSettings = GetSettings;
var UpdateSettings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, allowCompanyChange, themeColor, companyLogo, base64Data, sizeInBytes, sizeInMB, allowedFormats, format, existingSettings, settings, updateData, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                _a = req.body, allowCompanyChange = _a.allowCompanyChange, themeColor = _a.themeColor, companyLogo = _a.companyLogo;
                // Debug logging for logo data
                if (companyLogo && typeof companyLogo === "string") {
                    console.log("\uD83D\uDCCA Logo data length: ".concat(companyLogo.length, " characters"));
                    console.log("\uD83D\uDCCA Logo data preview: ".concat(companyLogo.substring(0, 100), "..."));
                }
                // Validate themeColor format (hex color)
                if (themeColor && !/^#[0-9A-F]{6}$/i.test(themeColor)) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Invalid theme color format. Use hex color (e.g., #094BAC)",
                        })];
                }
                // Validate companyLogo (if provided, should be base64 or null)
                if (companyLogo !== null && companyLogo !== undefined) {
                    if (typeof companyLogo !== "string") {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Company logo must be a string or null" })];
                    }
                    // Check if it's a valid base64 data URL
                    if (!companyLogo.startsWith("data:image/")) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Company logo must be a valid base64 data URL" })];
                    }
                    base64Data = companyLogo.split(",")[1];
                    if (base64Data) {
                        sizeInBytes = Math.ceil((base64Data.length * 3) / 4);
                        sizeInMB = sizeInBytes / (1024 * 1024);
                        if (sizeInMB > 5) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json({ error: "Company logo size must be less than 5MB" })];
                        }
                    }
                    allowedFormats = [
                        "image/png",
                        "image/jpeg",
                        "image/jpg",
                        "image/svg+xml",
                    ];
                    format = (_b = companyLogo.match(/data:([^;]+)/)) === null || _b === void 0 ? void 0 : _b[1];
                    if (format && !allowedFormats.includes(format)) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Company logo must be PNG, JPG, or SVG format" })];
                    }
                }
                return [4 /*yield*/, Settings_1.Settings.findOne({ _id: "1" })];
            case 1:
                existingSettings = _c.sent();
                settings = void 0;
                if (!existingSettings) return [3 /*break*/, 3];
                updateData = {};
                if (allowCompanyChange !== undefined)
                    updateData.allowCompanyChange = allowCompanyChange;
                if (themeColor !== undefined)
                    updateData.themeColor = themeColor;
                if (companyLogo !== undefined)
                    updateData.companyLogo = companyLogo;
                console.log("\uD83D\uDCBE Saving logo data with length: ".concat((companyLogo === null || companyLogo === void 0 ? void 0 : companyLogo.length) || 0, " characters"));
                return [4 /*yield*/, Settings_1.Settings.findByIdAndUpdate("1", updateData, {
                        new: true,
                    })];
            case 2:
                settings = _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, Settings_1.Settings.create({
                    _id: "1",
                    allowCompanyChange: allowCompanyChange !== null && allowCompanyChange !== void 0 ? allowCompanyChange : false,
                    themeColor: themeColor !== null && themeColor !== void 0 ? themeColor : "#094BAC",
                    companyLogo: companyLogo,
                })];
            case 4:
                settings = _c.sent();
                _c.label = 5;
            case 5:
                // Debug logging for saved data
                if (settings.companyLogo) {
                    console.log("\u2705 Saved logo data length: ".concat(settings.companyLogo.length, " characters"));
                    console.log("\u2705 Saved logo preview: ".concat(settings.companyLogo.substring(0, 100), "..."));
                }
                return [2 /*return*/, res.json(settings)];
            case 6:
                error_2 = _c.sent();
                console.error("Error updating settings:", error_2);
                return [2 /*return*/, res.status(500).json({ error: "Failed to update settings" })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.UpdateSettings = UpdateSettings;
//# sourceMappingURL=AdminController.js.map