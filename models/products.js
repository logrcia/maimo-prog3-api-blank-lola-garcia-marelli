import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  type: { type: String, required: true }, // ropa o musica

  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true },
  imageAlt: { type: [String] },

  // solo para ropa
  color: { type: [String] },
  size: { type: [String] },
  print: { type: [String] }, 
  signed: { type: [Boolean], default: false }, 

  // solo para música
  cover: { type: [String] }, 

  categories: [{ type: Schema.Types.ObjectId, ref:"Category"}]
});

export default mongoose.model("Product", productSchema, "Products");
