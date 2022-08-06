import express from "express";
import { StatusCodes as STATUS_CODES } from "http-status-codes";

import routes from "./routes/index.js";

import db from "./config/dbConnect.js";
import livros from "./models/Livro.js";

db.on("error", (e) => console.log.bind(console, e));
db.once("open", () => {
  console.log("🟢 Conexão com o banco realizada com sucesso!");
});

const app = express();
app.use(express.json());

routes(app);

app.delete("/livros/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0) {
    res.status(STATUS_CODES.BAD_REQUEST).send();
    return;
  }

  const indiceLivroEncontrado = buscaIndiceLivro(id);
  if (indiceLivroEncontrado === -1) {
    res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: "Livro não encontrado!" });
    return;
  }

  livros.splice(indiceLivroEncontrado, 1);
  res.status(STATUS_CODES.NO_CONTENT).send();
});

function buscaIndiceLivro(id) {
  return livros.findIndex((livro) => livro.id === id);
}

export default app;
