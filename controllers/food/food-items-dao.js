import foodItemsModel from './food-items-model.js';

export const findFoodItems = () => foodItemsModel.find();

export const findFoodItemsByRestaurantId = (restaurant_id) => foodItemsModel.find({restaurant_id: restaurant_id});

export const findFoodItemsByItemId = (itemId) => foodItemsModel.find({_id: itemId});

export const findFoodItemsByNameAndRestaurant = (itemName, restaurantId) =>  foodItemsModel.find({itemName: {'$regex': itemName, '$options': 'i'}, restaurant_id: restaurantId});

export const createFoodItems = (foodItem) => foodItemsModel.create(foodItem);

export const deleteFoodItem = (itemId) => foodItemsModel.deleteOne({_id: itemId});

export const updateFoodItem = (itemId, foodItem) => foodItemsModel.updateOne({_id: itemId}, {$set: foodItem})