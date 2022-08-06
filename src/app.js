import express from "express";
import { StatusCodes as STATUS_CODES } from "http-status-codes";

import db from "./config/dbConnect.js";
import livros from "./models/Livro.js";

db.on("error", (e) => console.log.bind(console, e));
db.once("open", () => {
  console.log("🟢 Conexão com o banco realizada com sucesso!");
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Curso de NodeJS");
});

app.get("/livros", (req, res) => {
  livros.find((error, livros) => {
    res.json(livros);
  });
});

app.get("/livros/:id", (req, res) => {
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

  const livroEncontrado = livros[indiceLivroEncontrado];
  res.status(STATUS_CODES.OK).json(livroEncontrado);
});

app.post("/livros", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) return res.status(STATUS_CODES.BAD_REQUEST).send();

  const newBook = { ...body, id: livros.length + 1 };
  livros.push(newBook);

  res.status(STATUS_CODES.CREATED).json(newBook);
});

app.put("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;

  if (isNaN(id) || id <= 0 || !title) {
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

  livros[indiceLivroEncontrado].title = title;

  res.status(STATUS_CODES.NO_CONTENT).send();
});

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
