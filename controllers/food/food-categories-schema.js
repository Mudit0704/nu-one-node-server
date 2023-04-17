import mongoose from 'mongoose';
const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: String
}, {collection: 'foodCategories'});
export default schema;