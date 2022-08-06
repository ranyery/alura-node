import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const username = process.env.USERNAMEMONGO;
const password = process.env.PASSWORDMONGO;

//mongoose.connect("mongodb://127.0.0.1:27017/alura-node");
mongoose.connect(
  `mongodb+srv://${username}:${password}@curso-node-alura.4t62rbw.mongodb.net/alura-node`
);

const db = mongoose.connection;

export default db;
