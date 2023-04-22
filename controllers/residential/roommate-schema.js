import mongoose from 'mongoose';
const schema = mongoose.Schema({
    _id: Number,
    name: String,
    gender : String,
    description: String,
    homeTown: String,
    homeCountry: String,
    expectedGraduation: String,
    admissionType : String,
}, {collection: 'roommate'});
export default schema;

