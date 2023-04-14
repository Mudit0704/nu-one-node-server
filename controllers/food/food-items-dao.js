import foodItemsModel from './food-items-model.js';

export const findFoodItems = () => foodItemsModel.find();

export const createFoodItems = (foodItem) => foodItemsModel.create(foodItem);

export const deleteFoodItem = (itemId) => foodItemsModel.deleteOne({_id: itemId});

export const updateFoodItem = (itemId, foodItem) => foodItemsModel.updateOne({_id: itemId}, {$set: foodItem})