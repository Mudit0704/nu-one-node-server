import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: String,
  type: String,
  sub_type: String,
  email: String,
  password: String,
  contact: String,
  address: String
}, {collection: "users"});

export default schema;