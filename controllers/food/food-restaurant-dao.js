import foodRestaurantModel from './food-restaurant-model.js';

export const findRestaurants = () => foodRestaurantModel.find();

export const findRestaurantsByCategory = (categoryId) => foodRestaurantModel.find({"menu_items.categories": categoryId});

export const findRestaurantsByOwnerId = (ownerId) => {
  return foodRestaurantModel.find({ownerId: ownerId})
};

export const findRestaurantsById = (restaurantId) => {
  return foodRestaurantModel.find({_id: restaurantId})
};

export const addToRestaurantMenu = (restaurantId, menuItem) => foodRestaurantModel.updateOne({_id: restaurantId}, {$push: {menu_items: menuItem}});

export const updateRestaurantMenuItem = (restaurantId, menuItemId, updates) => foodRestaurantModel.updateOne({_id: restaurantId, "menu_items._id": menuItemId}, {$set: {"menu_items.$": updates}});

export const deleteRestaurantFoodItem = (restaurantId, menuItemId) => foodRestaurantModel.updateOne({_id: restaurantId}, {$pull: {menu_items : {_id : menuItemId}}});

export const createRestaurant = (restaurant) => foodRestaurantModel.create(restaurant);

export const deleteRestaurant = (restaurant_id) => foodRestaurantModel.deleteOne({_id: restaurant_id});

export const updateRestaurant = (restaurant_id, restaurant) => foodRestaurantModel.updateOne({_id: restaurant_id}, {$set: restaurant})