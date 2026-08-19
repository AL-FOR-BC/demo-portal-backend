// import {PrismaClient} from "@prisma/client";

// declare global {
//     var prismadb: PrismaClient | undefined;
// }

// function initializePrismaClient() {
//     let client;

//     if (!global.prismadb) {
//         client = new PrismaClient();
//         if (process.env.NODE_ENV !== "production") {
//             global.prismadb = client;
//         }
//     } else {
//         client = global.prismadb;
//     }

//     return client;
// }
// export const prisma = initializePrismaClient();

// module.exports = { client: initializePrismaClient() };
