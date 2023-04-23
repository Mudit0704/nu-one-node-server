import mongoose from 'mongoose';
import indeedJobSchema from './indeedJob-schema.js';
const indeedJobModel = mongoose.model('indeedJobSchema', indeedJobSchema);

export default indeedJobModel;