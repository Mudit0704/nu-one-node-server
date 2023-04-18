import foodRestaurantModel from './food-restaurant-model.js';

export const findRestaurants = () => foodRestaurantModel.find();

export const findRestaurantsByCategory = (categoryId) => foodRestaurantModel.find({"menu_items.categories": categoryId});

export const findRestaurantsByOwnerId = (ownerId) => {
  return foodRestaurantModel.find({ownerId: ownerId})
};

export const addToRestaurantMenu = (restaurantId, menuItem) => foodRestaurantModel.updateOne({_id: restaurantId}, {$push: {menu_items: menuItem}});

export const updateRestaurantMenuItem = (restaurantId, menuItemId, updates) => {
  console.log(updates)
  console.log(restaurantId)
  console.log(menuItemId)
  return foodRestaurantModel.updateOne(
      {_id: restaurantId, "menu_items._id": menuItemId},
      {$set: {"menu_items.$": updates}})
};

// db.foodRestaurants.updateOne({_id: ObjectId('643dc0ac1b29be2ae5e43f27'),
//   "menu_items._id": ObjectId('643e045fc02211e62bba1142')},
//     {$set: {"menu_items.$":
//             {
//       _id: '643e045fc02211e62bba1142',
//       itemName: 'Food Item 1 Updated',
//       restaurant_id: '643dc0ac1b29be2ae5e43f27',
//       itemDescription: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
//       price: 9.99,
//       image: 'logo192.png',
//       calories: 300,
//       categories: [ '643acb105f33ffcba6677208' ]
//     }
//   }})

export const deleteRestaurantFoodItem = (restaurantId, menuItemId) => foodRestaurantModel.updateOne({_id: restaurantId}, {$pull: {menu_items : {_id : menuItemId}}});

export const createRestaurant = (restaurant) => foodRestaurantModel.create(restaurant);

export const deleteRestaurant = (restaurant_id) => foodRestaurantModel.deleteOne({_id: restaurant_id});

export const updateRestaurant = (restaurant_id, restaurant) => foodRestaurantModel.updateOne({_id: restaurant_id}, {$set: restaurant})