import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  platform: { type: String },
  releaseYear: { type: Number },
  image: { type: String },   
  rating: { type: Number, default: 0 },
  hoursPlayed: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Game || mongoose.model("Game", gameSchema);

