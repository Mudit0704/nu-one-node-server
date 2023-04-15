import * as foodRestaurantDao from "./food-restaurant-dao.js"
import * as foodCategoriesDao from "./food-categories-dao.js"

const findAllRestaurants = async (req, res) => {
  const restaurants = await foodRestaurantDao.findRestaurants();
  // console.log(restaurants)
  res.json(restaurants);
}

const findAllRestaurantsByCategory = async (req, res) => {
  const category = await foodCategoriesDao.findFoodCategories(req.params.category);
  const restaurants = await foodRestaurantDao.findRestaurantsByCategory(category[0]._id);
  res.json(restaurants);
}

export default (app) => {
  app.get("/api/foodRestaurants", findAllRestaurants);
  app.get("/api/foodRestaurants/:category", findAllRestaurantsByCategory);
}