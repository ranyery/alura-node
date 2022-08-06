// @ts-check
import autores from "../models/Autor.js";
import { StatusCodes as STATUS_CODES } from "http-status-codes";
import { objectHasRequiredProperties } from "../utils/utils.js";
import { badRequest, internalServerError } from "../utils/httpErrorHandler.js";

class autoresController {
  static listarAutores = (req, res) => {
    autores.find((error, result) => {
      if (error) return internalServerError(res, error);

      res.send(result);
    });
  };

  static listaAutorPorId = (req, res) => {
    const id = req.params["id"];

    autores.findById(id, (error, result) => {
      if (error) {
        const message = "Author not found.";
        return badRequest(res, message);
      }

      res.send(result);
    });
  };

  static cadastrarAutor = (req, res) => {
    const body = req.body;
    const requiredProperties = ["name", "nationality"];

    const { hasRequiredProperties, missingProperty } =
      objectHasRequiredProperties(body, requiredProperties);

    if (!hasRequiredProperties) {
      const message = `Property '${missingProperty}' is required.`;
      return badRequest(res, message);
    }

    const autor = new autores(body);
    autor.save((error) => {
      if (error) return internalServerError(res, error);

      res.status(STATUS_CODES.CREATED).send(autor.toJSON());
    });
  };

  static atualizarAutor = (req, res) => {
    const id = req.params["id"];

    const bodyProperties = Object.keys(req.body);
    if (bodyProperties.length === 0) {
      const message = "Empty request body.";
      return badRequest(res, message);
    }

    autores.findByIdAndUpdate(id, { $set: req.body }, (error) => {
      if (error) return internalServerError(res, error);

      res.send({ message: "Author successfully updated." });
    });
  };

  static excluirAutorPorId = (req, res) => {
    const id = req.params["id"];

    autores.findByIdAndDelete(id, (error) => {
      if (error) return internalServerError(res, error);

      res.status(STATUS_CODES.NO_CONTENT).send();
    });
  };
}

export default autoresController;
