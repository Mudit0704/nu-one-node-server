import mongoose from 'mongoose';
import foodReviewSchema from './food-reviews-schema.js'
const foodReviewModel = mongoose.model('foodReviewSchema', foodReviewSchema);

export default foodReviewModel;