import mongoose from 'mongoose';
import foodRestaurantSchema from './food-restaurants-schema.js'
const foodRestaurantModel = mongoose.model('foodRestaurantModel', foodRestaurantSchema);

export default foodRestaurantModel;