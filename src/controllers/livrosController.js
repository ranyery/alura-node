// @ts-check
import livros from "../models/Livro.js";
import {
  StatusCodes as STATUS_CODES,
  getReasonPhrase,
} from "http-status-codes";
import { objectHasRequiredProperties } from "../utils/utils.js";

class livrosController {
  static listarLivros = (req, res) => {
    livros.find((error, livros) => {
      if (error) {
        return res
          .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .send({ error: getReasonPhrase(STATUS_CODES.INTERNAL_SERVER_ERROR) });
      }

      res.status(STATUS_CODES.OK).json(livros);
    });
  };

  static cadastrarLivro = (req, res) => {
    const body = req.body;
    const requiredProperties = ["title", "author", "price"];

    const { hasRequiredProperties, missingProperty } =
      objectHasRequiredProperties(body, requiredProperties);

    if (!hasRequiredProperties) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ error: `Property '${missingProperty}' is required.` });
    }

    const livro = new livros(body);
    livro.save((error) => {
      if (error) {
        res
          .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
          .send({ error: getReasonPhrase(STATUS_CODES.INTERNAL_SERVER_ERROR) });
        return;
      }

      res.status(STATUS_CODES.CREATED).send(livro.toJSON());
    });
  };
}

export default livrosController;
