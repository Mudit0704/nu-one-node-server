import mongoose from 'mongoose';
const schema = mongoose.Schema({
  address: String,
  status: String,
  restaurant_id: {type: mongoose.Schema.Types.ObjectId, ref: 'foodRestaurants'},
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