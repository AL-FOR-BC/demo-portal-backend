"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var client_1 = require("@prisma/client");
function initializePrismaClient() {
    var client;
    if (!global.prismadb) {
        client = new client_1.PrismaClient();
        if (process.env.NODE_ENV !== "production") {
            global.prismadb = client;
        }
    }
    else {
        client = global.prismadb;
    }
    return client;
}
exports.prisma = initializePrismaClient();
// module.exports = { client: initializePrismaClient() };
//# sourceMappingURL=Prismadb.js.map