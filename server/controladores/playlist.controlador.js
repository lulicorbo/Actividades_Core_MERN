import Playlist from "../modelos/playlist.modelo.js";
import Cancion from "../modelos/cancion.modelo.js";

const playlistController = {
  getAll: async (req, res) => {
    try {
      const allPlaylists = await Playlist.find();
      return res.status(200).json(allPlaylists);
    } catch (e) {
      return res.status(400).json(e);
    }
  },

  getOne: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id);
      if (!playlist) {
        return res.status(404).json({ message: "Playlist no encontrada" });
      }
      return res.status(200).json(playlist);
    } catch (e) {
      return res.status(400).json(e);
    }
  },

  createOne: async (req, res) => {
    const { name, canciones } = req.body;

    try {
      const foundSongs = await Cancion.find({ titulo: { $in: canciones } });

      if (foundSongs.length !== canciones.length) {
        return res.status(400).json({
          message: "Una o más canciones no fueron encontradas"
        });
      }

      const newPlaylist = {
        name,
        canciones: foundSongs
      };

      const savedPlaylist = await Playlist.create(newPlaylist);
      return res.status(201).json(savedPlaylist);
    } catch (e) {
      if (e.code === 11000) {
        return res.status(400).json({
          errors: {
            name: { message: "Esta playlist ya existe. Elige otro nombre." }
          }
        });
      }

      if (e.name === "ValidationError") {
        const messages = {};
        Object.keys(e.errors).forEach(key => {
          messages[key] = e.errors[key].message;
        });
        return res.status(400).json({ errors: { ...messages } });
      }

      return res.status(400).json(e);
    }
  },

  deleteOne: async (req, res) => {
    const id = req.params.id;

    try {
      const deleted = await Playlist.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "El ID indicado no existe" });
      }

      return res.status(200).json({
        message: "La playlist fue eliminada correctamente"
      });
    } catch (e) {
      return res.status(400).json(e);
    }
  },

  updateOne: async (req, res) => {
    const id = req.params.id;
    const { name, canciones } = req.body;

    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;

    try {
      if (canciones) {
        const regexTitles = canciones.map(
          t => new RegExp("^" + t + "$", "i")
        );

        const foundSongs = await Cancion.find({
          titulo: { $in: regexTitles }
        });

        if (foundSongs.length !== canciones.length) {
          return res.status(400).json({
            message: "Una o más canciones no existen en la base de datos."
          });
        }

        dataToUpdate.canciones = foundSongs;
      }

      const updated = await Playlist.findByIdAndUpdate(
        id,
        dataToUpdate,
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "El ID indicado no existe" });
      }

      return res.status(200).json(updated);
    } catch (e) {
      if (e.code === 11000) {
        return res.status(400).json({
          errors: {
            name: { message: "Esta playlist ya existe. Elige otro nombre." }
          }
        });
      }

      if (e.name === "ValidationError") {
        const messages = {};
        Object.keys(e.errors).forEach(key => {
          messages[key] = e.errors[key].message;
        });
        return res.status(400).json({ errors: { ...messages } });
      }

      return res.status(400).json(e);
    }
  }
};

export default playlistController;
