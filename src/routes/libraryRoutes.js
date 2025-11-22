import express from "express";
import {
  addToLibrary,
  removeFromLibrary,
  getLibrary,
} from "../controllers/libraryController.js";

const router = express.Router();

router.get("/", getLibrary); 
router.post("/add", addToLibrary); 
router.delete("/remove", removeFromLibrary); 

export default router;
