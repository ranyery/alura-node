import express from "express";
import AutoresController from "../controllers/autoresController.js";

const router = express.Router();

router
  .get("/autores", AutoresController.listarAutores)
  .get("/autores/:id", AutoresController.listaAutorPorId)
  .post("/autores", AutoresController.cadastrarAutor)
  .put("/autores/:id", AutoresController.atualizarAutor)
  .delete("/autores/:id", AutoresController.excluirAutorPorId);

export default router;
