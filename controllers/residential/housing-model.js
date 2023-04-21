import mongoose from 'mongoose';
import housingSchema from "./housing-schema.js";
const housesModel = mongoose
    .model('HouseModel', housingSchema);
export default housesModel;

