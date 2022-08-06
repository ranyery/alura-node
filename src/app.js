import express from "express";
import { StatusCodes as STATUS_CODES } from "http-status-codes";

const app = express();
app.use(express.json());

const livros = [
  {
    id: 1,
    title: "Meu Pé de Laranja Lima",
    author: "José Mauro de Vasconcelos",
  },
  { id: 2, title: "O Mundo de Sofia", author: "Jostein Gaarder" },
  { id: 3, title: "A História sem fim", author: "Michael Ende" },
];

app.get("/", (req, res) => {
  res.send("Curso de NodeJS");
});

app.get("/livros", (req, res) => {
  res.json(livros);
});

app.get("/livros/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0) {
    res.status(STATUS_CODES.BAD_REQUEST).send();
    return;
  }

  let indiceLivroEncontrado = buscaIndiceLivro(id);
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
