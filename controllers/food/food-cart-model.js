import mongoose from 'mongoose';
import foodCartSchema from './food-cart-schema.js'
const foodCartModel = mongoose.model('foodCartSchema', foodCartSchema);

export default foodCartModel;