import express from "express";
const app = express();

import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { router as authRouter } from "./routes/auth.js";
export const db = drizzle(process.env.DATABASE_URL!);

app.use("/api/v1/auth", authRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
