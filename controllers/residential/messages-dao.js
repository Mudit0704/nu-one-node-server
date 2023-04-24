import messagesModel from "./messages-model.js";

export const findMessages = () => messagesModel.find();
export const createMessages = (house) => messagesModel.create(house);
export const findMessagesByUserId = userId => messagesModel.find({userId: userId});