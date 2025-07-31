"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginInput = exports.CreateUserInput = void 0;
var class_validator_1 = require("class-validator");
var CreateUserInput = /** @class */ (function () {
    function CreateUserInput() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], CreateUserInput.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.Length)(6, 128),
        __metadata("design:type", String)
    ], CreateUserInput.prototype, "password", void 0);
    return CreateUserInput;
}());
exports.CreateUserInput = CreateUserInput;
var UserLoginInput = /** @class */ (function () {
    function UserLoginInput() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], UserLoginInput.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.Length)(6, 128),
        __metadata("design:type", String)
    ], UserLoginInput.prototype, "password", void 0);
    return UserLoginInput;
}());
exports.UserLoginInput = UserLoginInput;
//# sourceMappingURL=User.dto.js.map