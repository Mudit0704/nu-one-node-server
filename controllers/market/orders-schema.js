import mongoose from "mongoose";

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orders: [
    {
      _id: Number,
      date: String,
      status: String,
      totalValue: Number,
      address: String,
      paymentMethod: String,
      items: [
        {
          _id: mongoose.Schema.Types.ObjectId,
          name: String,
          price: Number,
          quantity: Number
        }
      ]
    }
  ]
}
, {collection: "marketorders"});

export default schema;