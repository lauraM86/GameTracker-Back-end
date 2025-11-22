import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    gameId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Game" },

    userId: { type: String, required: true },

    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 10, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
