import mongoose from "mongoose";

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  items: [
    {
      restaurant_id: mongoose.Schema.Types.ObjectId,
      _id: mongoose.Schema.Types.ObjectId,
      itemName: String,
      price: Number,
      quantity: Number
    }
  ]
}, {collection: "foodCarts"});

export default schema;