import mongoose from 'mongoose';
import foodItemsScehma from './food-items-schema.js'
const foodItemsModel = mongoose.model('foodItemsModel', foodItemsScehma);

export default foodItemsModel;