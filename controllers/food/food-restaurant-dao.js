import foodRestaurantModel from './food-restaurant-model.js';

export const findRestaurants = () => foodRestaurantModel.find();

export const createRestaurant = (restaurant) => foodRestaurantModel.create(restaurant);

export const deleteRestaurant = (restaurant_id) => foodRestaurantModel.deleteOne({_id: restaurant_id});

export const updateRestaurant = (restaurant_id, restaurant) => foodRestaurantModel.updateOne({_id: restaurant_id}, {$set: restaurant})