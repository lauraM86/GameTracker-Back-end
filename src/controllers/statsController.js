import UserGameStats from "../models/UserGameStats.js";
import mongoose from "mongoose";

export const getUserStats = async (req, res) => {
  const { userId } = req.params;

  try {
  
    const stats = await UserGameStats.find({ userId }).populate("gameId");
    const validStats = stats.filter((s) => s.gameId != null);

    res.json(validStats);
  } catch (err) {
    console.error("getUserStats error:", err);
    res.status(500).json({ error: "Error fetching stats" });
  }
};

export const updateUserStats = async (req, res) => {
  const { userId, gameId } = req.params;
  const { hoursPlayed, difficulty, completed, progress } = req.body;

  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    return res.status(400).json({ error: "gameId inválido" });
  }

  try {
    const updated = await UserGameStats.findOneAndUpdate(
      { userId, gameId: new mongoose.Types.ObjectId(gameId) },
      {
        hoursPlayed: Number(hoursPlayed) || 0,
        difficulty: difficulty || "Fácil",
        completed: completed === true || completed === "true",
        progress: Number(progress) || 0,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate("gameId");

    res.json(updated);
  } catch (err) {
    console.error("updateUserStats error:", err);
    res.status(500).json({ error: "Error updating stats" });
  }
};

export const deleteUserStatsByGame = async (req, res) => {
  const { userId, gameId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    return res.status(400).json({ error: "gameId inválido" });
  }

  try {
    const deleted = await UserGameStats.findOneAndDelete({
      userId,
      gameId: new mongoose.Types.ObjectId(gameId),
    });

    if (!deleted) {
      return res.status(404).json({ error: "Stats no encontrados" });
    }

    res.json({ message: "Stats eliminadas correctamente" });
  } catch (err) {
    console.error("deleteUserStatsByGame error:", err);
    res.status(500).json({ error: "Error deleting stats" });
  }
};
