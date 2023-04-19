import mongoose from 'mongoose';
import userSchema from './user-schema.js'
const userModel = mongoose.model('userSchema', userSchema);

export default userModel;