import mongoose from "mongoose";
import ordersSchema from "./orders-schema.js";

const ordersModel = mongoose.model("OrdersModel", ordersSchema);

export default ordersModel;