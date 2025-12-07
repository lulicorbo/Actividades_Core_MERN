import Cancion from "../modelos/cancion.modelo.js";
//ver como hace kevin clase 23-10
const cancionesController = {
    getCanciones: async (req, res) => {
        try {
            const canciones = await Cancion.find();
            return res.status(200).json(canciones)
        } catch (e) {
            return res.status(500).json({ error: "Error al obtener las canciones", details: e })
        }
    },

    crearCancion: async (req, res) => {
        const { titulo, artista, anioLanzamiento, genero } = req.body;
        const nuevaCancionData = { titulo, artista, anioLanzamiento, genero }

        try {
            const nuevaCancion = await Cancion.create(nuevaCancionData)
            return res.status(201).json(nuevaCancion)
        } catch (e) {
            const messages = {};
            if (e.name === "ValidationError") {
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                })
                return res.status(400).json({ errors: { ...messages } })
            }
            return res.status(500).json({ error: "Error al crear la canción", details: e })
        }
    },

    getCancion: async (req, res) => {
        const id = req.params.id;

        try {
            const cancion = await Cancion.findById(id)
            if (!cancion) {
                return res.status(404).json({ message: "La ID indicada no existe" })
            }
            return res.status(200).json(cancion)
        } catch (e) {
            if (e.name === "CastError") {
                return res.status(400).json({ message: "Formato de ID inválido" })
            }
            return res.status(500).json({ error: "Error al buscar la canción", details: e })
        }
    },

    eliminarCancion: async (req, res) => {
        const id = req.params.id;
        try {
            const cancionEliminada = await Cancion.findByIdAndDelete(id)
            if (!cancionEliminada) {
                return res.status(404).json({ message: "La ID indicada no existe" })
            }
            return res.status(200).json({ message: "La canción fue eliminada exitosamente", cancion: cancionEliminada })
        } catch (e) {
            if (e.name === "CastError") {
                return res.status(400).json({ message: "Formato de ID inválido" })
            }
            return res.status(500).json({ error: "Error al eliminar la canción", details: e })
        }
    },

    actualizarCancion: async (req, res) => {
        const id = req.params.id;
        const { titulo, artista, anioLanzamiento, genero } = req.body;
        
        const dataAActualizar = {
            ...(titulo && { titulo }),
            ...(artista && { artista }),
            ...(anioLanzamiento && { anioLanzamiento }),
            ...(genero && { genero })
        };

        try {
            const cancionActualizada = await Cancion.findByIdAndUpdate(
                id, 
                dataAActualizar, 
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!cancionActualizada) {
                return res.status(404).json({ message: "La ID indicada no existe" })
            }
            return res.status(200).json(cancionActualizada)
        } catch (e) {
            const messages = {};
            if (e.name === "ValidationError") {
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                })
                return res.status(400).json({ errors: { ...messages } })
            }
            if (e.name === "CastError") {
                return res.status(400).json({ message: "Formato de ID inválido" })
            }
            return res.status(500).json({ error: "Error al actualizar la canción", details: e })
        }
    }
}

export default cancionesController;