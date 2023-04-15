import mongoose from 'mongoose';
const schema = mongoose.Schema({
  itemName: String,
  itemDescription: String,
  restaurant_id: {type: mongoose.Schema.Types.ObjectId, ref: 'foodRestaurants'},
  categories: [mongoose.Schema.Types.ObjectId],
  price: Number,
  image: String,
  calories: Number,
}, {collection: 'foodItems'});
export default schema;