import * as foodRestaurantDao from "./food-restaurant-dao.js"
import * as foodCategoriesDao from "./food-categories-dao.js"
import {findRestaurantsByOwnerId} from "./food-restaurant-dao.js";

const findAllRestaurants = async (req, res) => {
  const restaurants = await foodRestaurantDao.findRestaurants();
  res.json(restaurants);
}

const findAllRestaurantsByOwnerId = async (req, res) => {
  const ownerId = req.params.ownerId;
  const restaurants = await foodRestaurantDao.findRestaurantsByOwnerId(ownerId);
  res.json(restaurants);
}

// const findAllRestaurantsByCategory = async (req, res) => {
//   const category = await foodCategoriesDao.findFoodCategories(req.params.category);
//   const restaurants = await foodRestaurantDao.findRestaurantsByCategory(category[0]._id);
//   res.json(restaurants);
// }

export default (app) => {
  app.get("/api/foodRestaurants", findAllRestaurants);
  // app.get("/api/foodRestaurants/:category", findAllRestaurantsByCategory); // TODO MODIFY THE SEARCH TO USE ENCODED PARAMS
  app.get("/api/foodRestaurants/:ownerId", findAllRestaurantsByOwnerId);
}