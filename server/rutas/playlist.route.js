import { Router } from "express";
import playlistController from "../controladores/playlist.controlador.js";

const router = Router();

router.post("/", playlistController.createOne);
router.get("/", playlistController.getAll);
router.get("/:id", playlistController.getOne);
router.put("/:id", playlistController.updateOne);
router.delete("/:id", playlistController.deleteOne);

export default router;
