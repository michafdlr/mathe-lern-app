import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";
config({ path: '.env.local' });

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.jsx",
  // out: "./drizzle",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
});
