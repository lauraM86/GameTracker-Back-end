import User from "../models/user.js";
import UserGameStats from "../models/UserGameStats.js";

export const addToLibrary = async (req, res) => {
  try {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) return res.status(400).json({ message: "Faltan userId o gameId" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.library.includes(gameId)) return res.status(400).json({ message: "El juego ya está en tu biblioteca" });

    user.library.push(gameId);
    await user.save();

    const populatedUser = await User.findById(userId).populate("library");
    res.status(201).json({ message: "Juego añadido", library: populatedUser.library });
  } catch (error) {
    console.error("Error addToLibrary:", error);
    res.status(500).json({ message: "Error al agregar juego" });
  }
};

export const removeFromLibrary = async (req, res) => {
  try {
    const { userId, gameId } = req.body;
    if (!userId || !gameId) return res.status(400).json({ message: "Faltan userId o gameId" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });


    user.library = user.library.filter((id) => id.toString() !== gameId);
    await user.save();

 
    await UserGameStats.deleteOne({ userId, gameId });

    const populatedUser = await User.findById(userId).populate("library");
    res.json({ message: "Juego y estadísticas eliminadas correctamente", library: populatedUser.library });
  } catch (error) {
    console.error("Error removeFromLibrary:", error);
    res.status(500).json({ message: "Error al remover juego" });
  }
};

export const getLibrary = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Falta userId" });

    const user = await User.findById(userId).populate("library");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ games: user.library });
  } catch (error) {
    console.error("Error getLibrary:", error);
    res.status(500).json({ message: "Error al cargar biblioteca" });
  }
};
