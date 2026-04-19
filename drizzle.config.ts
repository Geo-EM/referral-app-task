import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://referral_app:1K2a3sW67JRt53KZ@localhost:5432/referrals",
  },
} satisfies Config;