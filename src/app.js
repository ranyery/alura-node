import express from "express";
import routes from "./routes/index.js";
import db from "./config/dbConnect.js";

db.on("error", (e) => console.log.bind(console, e));
db.once("open", () => console.log("🟢 Database connection successful!"));

const app = express();
app.use(express.json());
routes(app);

export default app;
