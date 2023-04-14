import mongoose from "mongoose";
import adminsSchema from "./admins-schema.js";

const adminsModel = mongoose.model("AdminsModel", adminsSchema);

export default adminsModel;