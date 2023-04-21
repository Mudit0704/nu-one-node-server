import mongoose from 'mongoose';
import messagesSchema from "./messages-schema.js";
const messagesModel = mongoose
    .model('MessageModel', messagesSchema);
export default messagesModel;

