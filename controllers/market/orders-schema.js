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
          _id: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductsModel'},
          seller_id: {type: mongoose.Schema.Types.ObjectId, ref: 'AdminsModel'},
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