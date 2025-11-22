import mongoose from "mongoose";

const userGameStatsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, 
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    hoursPlayed: { type: Number, default: 0 },
    difficulty: { 
      type: String, 
      enum: ["Fácil", "Medio", "Difícil", "Hardcore"], 
      default: "Medio" 
    },
    completed: { type: Boolean, default: false },
    progress: { type: Number, default: 0 }, // 0 a 100%
  },
  { timestamps: true }
);

export default mongoose.model("UserGameStats", userGameStatsSchema);
