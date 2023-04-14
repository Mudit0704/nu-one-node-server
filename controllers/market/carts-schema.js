import mongoose from "mongoose";

const cartsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  items: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      seller_id: [mongoose.Schema.Types.ObjectId],
      name: String,
      brand: String,
      description: String,
      price: Number,
      quantity: Number,
      image: String,
      rating: Number
    },
  ],
}, {collection: "marketcarts"});

export default cartsSchema;