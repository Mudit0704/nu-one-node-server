import housesModel from "./housing-model.js";

export const findHouses = () => housesModel.find();
export const createHouses = (house) => housesModel.create(house);
