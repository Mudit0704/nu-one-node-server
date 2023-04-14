import mongoose from 'mongoose';
import foodOrderSchema from './food-orders-schema.js'
const foodOrderModel = mongoose.model('foodOrderModel', foodOrderSchema);

export default foodOrderModel;