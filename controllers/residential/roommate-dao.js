import roommateModel from "./roommate-model.js";
export const findRoommates = () => roommateModel.find();
export const createRoommates = (roommate) => roommateModel.create(roommate);
