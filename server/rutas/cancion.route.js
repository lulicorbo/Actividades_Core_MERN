import { Router } from "express";
import cancionesController from "../controladores/cancion.controlador.js"; 

const router = Router();

router.post("/", cancionesController.crearCancion);
router.get("/", cancionesController.getCanciones);
router.get("/:id", cancionesController.getCancion);
router.put("/:id", cancionesController.actualizarCancion);
router.delete("/:id", cancionesController.eliminarCancion);

export default router;