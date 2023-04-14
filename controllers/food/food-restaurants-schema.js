import mongoose from 'mongoose';
const schema = mongoose.Schema({
  name: String,
  address: String,
  description: String,
  average_ratings: Number,
  image: String
}, {collection: 'foodRestaurants'});
export default schema;