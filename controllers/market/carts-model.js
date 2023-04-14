import mongoose from "mongoose";
import cartsSchema from "./carts-schema.js";

const cartsModel = mongoose.model("CartsModel", cartsSchema);

export default cartsModel;