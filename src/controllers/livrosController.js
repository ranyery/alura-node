import livros from "../models/Livro.js";
import { StatusCodes as STATUS_CODES } from "http-status-codes";

class livrosController {
  static listarLivros = (req, res) => {
    livros.find((error, livros) => {
      res.status(STATUS_CODES.OK).json(livros);
    });
  };
}

export default livrosController;
