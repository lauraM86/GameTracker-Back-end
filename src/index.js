import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import gameRoutes from "./routes/gameRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/library", libraryRoutes); 
app.use("/api/stats", statsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));