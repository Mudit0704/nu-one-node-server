import mongoose from "mongoose";

const cartsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  items: [
    {
      _id: {type: mongoose.Schema.Types.ObjectId, ref : 'ProductsModel'},
      seller_id: {type: mongoose.Schema.Types.ObjectId, ref : 'AdminsModel'},
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
    },
  ],
}, {collection: "marketcarts"});

export default cartsSchema;