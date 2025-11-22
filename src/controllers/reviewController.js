import Review from "../models/review.js";

export const getReviews = async (req, res) => {
  try {
    const { gameId } = req.query;

    let reviews = [];

    if (gameId) {
      reviews = await Review.find({ gameId }).sort({ createdAt: -1 });
    } else {
      reviews = await Review.find();
    }

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { gameId, userId, comment, rating } = req.body;

    if (!gameId || !userId || !comment || !rating) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newReview = new Review({
      gameId,
      userId,
      comment,
      rating
    });

    await newReview.save();

    res.json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Error creating review" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;

    const updated = await Review.findByIdAndUpdate(
      id,
      { comment, rating },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating review" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting review" });
  }
};
