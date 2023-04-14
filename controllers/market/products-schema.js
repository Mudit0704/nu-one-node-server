import mongoose from "mongoose";

const schema = mongoose.Schema({
  seller_ids: [mongoose.Schema.Types.ObjectId],
  name: String,
  brand: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
  rating: Number
}, {collection: "marketproducts"});

export default schema;