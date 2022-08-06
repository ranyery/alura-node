import { StatusCodes as STATUS_CODES } from "http-status-codes";

export function internalServerError(res, error) {
  return res
    .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
    .send({ error: error.message });
}

export function badRequest(res, message) {
  return res.status(STATUS_CODES.BAD_REQUEST).send({ error: message });
}
