import mongoose from "mongoose";

const schema = mongoose.Schema({
  seller_id: {type: mongoose.Schema.Types.ObjectId, ref : 'users'},
  seller_name: String,
  name: String,
  brand: String,
  description: String,
  price: Number,
  quantity: Number,
  image: {
    data: Buffer,
    contentType: String
  },
  rating: Number
}, {collection: "marketproducts"});

export default schema;