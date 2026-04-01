import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
import claimRoutes from "./routes/claimRoute.js";


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(5001, () => console.log("Server is flying on port 5001"));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();


