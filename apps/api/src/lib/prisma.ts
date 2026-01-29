import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { env } from './env.js';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

declare const globalThis: {
  prismaGlobal: PrismaClient | undefined;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? new PrismaClient({ adapter });

if (env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
