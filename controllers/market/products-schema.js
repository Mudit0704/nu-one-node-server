import mongoose from "mongoose";

const schema = mongoose.Schema({
  seller_id: {type: mongoose.Schema.Types.ObjectId, ref : 'AdminsModel'},
  name: String,
  brand: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
  rating: Number
}, {collection: "marketproducts"});

export default schema;