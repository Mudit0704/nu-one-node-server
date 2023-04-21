import mongoose from 'mongoose';
const schema = mongoose.Schema({
  address: String,
  status: String,
  restaurant_id: {type: mongoose.Schema.Types.ObjectId, ref: 'foodRestaurants'},
  userId: mongoose.Schema.Types.ObjectId,
  orderTime: { type: Date, default: Date.now },
  items: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      itemName: String,
      price: Number,
      quantity: Number
    }
  ]
}, {collection: 'foodOrders'});
export default schema;