import mongoose from 'mongoose';
const schema = mongoose.Schema({
  name: String,
  address: String,
  description: String,
  average_ratings: Number,
  menu_items: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      itemName: String,
      itemDescription: String,
      price: Number,
      image: String,
      categories: [mongoose.Schema.Types.ObjectId],
      calories: Number,
    }
  ],
  image: String
}, {collection: 'foodRestaurants'});
export default schema;