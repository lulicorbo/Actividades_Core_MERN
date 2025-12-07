import mongoose from "mongoose";

const CancionSchema = new mongoose.Schema({
    "titulo": {
        "type": String,
        "required": [true, "El título es obligatorio."],
        "minlength": [6, "El título debe tener al menos 6 caracteres."],
        "maxlength": [255, "El título no puede exceder los 255 caracteres."]
    },
    "artista": {
        "type": String,
        "required": [true, "El artista es obligatorio."],
        "minlength": [10, "El artista debe tener al menos 10 caracteres."],
        "maxlength": [255, "El artista no puede exceder los 255 caracteres."]
    },
    "anioLanzamiento": {
        "type": Number,
        "required": [true, "El año de lanzamiento es obligatorio."],
        "min": [1000, "El año de lanzamiento debe ser un número de 4 dígitos."],
        "max": [9999, "El año de lanzamiento debe ser un número de 4 dígitos."],
    },
    "genero": {
        "type": String,
        "required": [true, "El género es obligatorio."]
    }
}, {
    "timestamps": true 
});

const Cancion = mongoose.model("Cancion", CancionSchema);

export default Cancion;