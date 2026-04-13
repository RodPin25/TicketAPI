const { PrismaClient } = require("@prisma/client");
const { PrismaSQLServer } = require("@prisma/adapter-sqlserver");
require("dotenv").config();

const conectionString = process.env.DATABASE_URL;

let prisma;

try{
    const adapter = new PrismaSQLServer(conectionString);
    prisma = new PrismaClient({ adapter });

    console.log("[INFO] Database connection established successfully.");
} catch(err){
    console.error("[ERROR] Failed to connect to the database:", err);
}

module.exports = prisma;