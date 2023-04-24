import mongoose from 'mongoose';
import jobSchema from './job-schema.js'
const jobModel = mongoose.model('jobSchema', jobSchema);

export default jobModel;