import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "AetherMind API Running 🚀"
    });

});

app.use("/api/auth", authRoutes);

export default app;