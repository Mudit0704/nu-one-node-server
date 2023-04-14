import mongoose from "mongoose";
import productsSchema from "./products-schema.js";

const productsModel = mongoose.model("ProductsModel", productsSchema);

export default productsModel;