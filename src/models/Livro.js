import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: true,
  },
  price: { type: Number, required: true },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
