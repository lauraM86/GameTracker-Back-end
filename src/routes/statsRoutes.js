import express from "express";
import {
  getUserStats,
  updateUserStats,
  deleteUserStatsByGame,
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/:userId", getUserStats);
router.put("/:userId/:gameId", updateUserStats);
router.delete("/:userId/:gameId", deleteUserStatsByGame);

export default router;
