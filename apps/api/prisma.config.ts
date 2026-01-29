import { existsSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Only load .env file if it exists (local dev)
// In Docker, env vars are passed via docker-compose environment section
const envPath = path.resolve(import.meta.dirname, ".env");
if (existsSync(envPath)) {
	process.loadEnvFile(envPath);
}

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
