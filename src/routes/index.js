import express from "express";
import livros from "./livrosRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Curso de NodeJS");
  });

  app.use(express.json());
  app.use(livros);
};

export default routes;
