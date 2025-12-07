import mongoose from "mongoose";
import CancionSchema from "./cancion.modelo.js"; 

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      unique: true
    },

    canciones: [CancionSchema.schema]
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
