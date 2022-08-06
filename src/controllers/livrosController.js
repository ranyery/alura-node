// @ts-check
import livros from "../models/Livro.js";
import { StatusCodes as STATUS_CODES } from "http-status-codes";
import { objectHasRequiredProperties } from "../utils/utils.js";
import { badRequest, internalServerError } from "../utils/httpErrorHandler.js";

class livrosController {
  static listarLivros = (req, res) => {
    livros.find((error, result) => {
      if (error) return internalServerError(res, error);

      res.send(result); // StatusCode 200 is set by default
    });
  };

  static listaLivroPorId = (req, res) => {
    const id = req.params["id"];

    livros.findById(id, (error, result) => {
      if (error) {
        const message = "Book not found.";
        return badRequest(res, message);
      }

      res.send(result);
    });
  };

  static cadastrarLivro = (req, res) => {
    const body = req.body;
    const requiredProperties = ["title", "author", "price"];

    const { hasRequiredProperties, missingProperty } =
      objectHasRequiredProperties(body, requiredProperties);

    if (!hasRequiredProperties) {
      const message = `Property '${missingProperty}' is required.`;
      return badRequest(res, message);
    }

    const livro = new livros(body);
    livro.save((error) => {
      if (error) return internalServerError(res, error);

      res.status(STATUS_CODES.CREATED).send(livro.toJSON());
    });
  };

  static atualizarLivro = (req, res) => {
    const id = req.params["id"];

    const bodyProperties = Object.keys(req.body);
    if (bodyProperties.length === 0) {
      const message = "Empty request body.";
      return badRequest(res, message);
    }

    livros.findByIdAndUpdate(id, { $set: req.body }, (error) => {
      if (error) return internalServerError(res, error);

      res.send({ message: "Book successfully updated." });
    });
  };

  static excluirLivroPorId = (req, res) => {
    const id = req.params["id"];

    livros.findByIdAndDelete(id, (error) => {
      if (error) return internalServerError(res, error);

      res.status(STATUS_CODES.NO_CONTENT).send();
    });
  };
}

export default livrosController;
