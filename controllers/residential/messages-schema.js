import mongoose from 'mongoose';
const schema = mongoose.Schema({
    _id: Number,
    name: String,
    houseId : Number,
    description: String,
}, {collection: 'messages'});
export default schema;

