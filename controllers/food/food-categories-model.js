import mongoose from 'mongoose';
import foodCategoriesSchema from './food-categories-schema.js'
const foodCategoriesModel = mongoose.model('foodCategoriesSchema', foodCategoriesSchema);

export default foodCategoriesModel;