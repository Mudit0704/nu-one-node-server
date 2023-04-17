import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      name: String,
      email: String,
      createdAt: { type: Date, default: Date.now },
      contact: String,
      address: String,
      role: {
        type: String,
        default: "user",
        enum: ["admin", "user", "marketAdmin", "foodAdmin", "careerAdmin",
        "residentialAdmin"],
      },
    },
    { collection: "users" }
);
export default usersSchema;