import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import mindmapRoutes from "./routes/mindmapRoutes";
import nodeRoutes from "./routes/nodeRoutes";
import edgeRoutes from "./routes/edgeRoutes";
import aiRoutes from "./routes/aiRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 AetherMind API Running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/mindmaps", mindmapRoutes);
app.use("/api/nodes", nodeRoutes);
app.use("/api/edges", edgeRoutes);
app.use("/api/ai", aiRoutes);

export default app;