import { PrismaClient } from "@/generated/prisma";

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare globalThis type to allow prisma instance globally during development
declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

// Check if Prisma client is already instantiated in global scope
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// If the environment is not production, store Prisma client instance in global scope to avoid re-instantiating
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
