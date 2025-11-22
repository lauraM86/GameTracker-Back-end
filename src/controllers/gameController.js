import Game from "../models/game.js";


export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};


export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Juego no encontrado" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el juego" });
  }
};


export const createGame = async (req, res) => {
  const { title, genre, platform, releaseYear, image } = req.body;

  try {
    const newGame = await Game.create({ title, genre, platform, releaseYear, image });
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el juego" });
  }
};


export const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedGame)
      return res.status(404).json({ message: "Juego no encontrado" });
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el juego" });
  }
};


export const deleteGame = async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame)
      return res.status(404).json({ message: "Juego no encontrado" });
    res.json({ message: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el juego" });
  }
};
