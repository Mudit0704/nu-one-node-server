import mongoose from 'mongoose';
const schema = mongoose.Schema({
    _id: Number,
    houseName: String,
    streetAddress : String,
    HouseDescription: String,
    rent: String,
    image: String,
    image2: String,
    image3 : String,
    bedrooms:Number,
    bathrooms: Number
}, {collection: 'houseItems'});
export default schema;

