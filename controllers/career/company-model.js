import mongoose from 'mongoose';
import companySchema from './company-schema.js'
const companyModel = mongoose.model('companySchema', companySchema);

export default companyModel;