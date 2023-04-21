import mongoose from 'mongoose';
import roommateSchema from "./roommate-schema.js";
const roommateModel = mongoose
    .model('RoommateModel', roommateSchema);
export default roommateModel;

