import mongoose from 'mongoose';
const schema = mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  userName: String,
  handle: String,
  title: String,
  description: String,
  numStars: Number,
  avatar: String,
  status: String,
  time: { type: Date, default: Date.now }, //for now, need to check correct format
  likes: Number,
  restaurant_id: {type: mongoose.Schema.Types.ObjectId, ref: 'foodRestaurants'},
  restaurantName: String
}, {collection: 'foodReviews'});
export default schema;