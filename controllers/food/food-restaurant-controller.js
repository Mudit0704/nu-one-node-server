import * as foodRestaurantDao from "./food-restaurant-dao.js"
import * as foodCategoriesDao from "./food-categories-dao.js"

const findAllRestaurants = async (req, res) => {
  const restaurants = await foodRestaurantDao.findRestaurants();
  res.json(restaurants);
}

const findAllRestaurantsByOwnerId = async (req, res) => {
  const ownerId = req.params.ownerId;
  const restaurants = await foodRestaurantDao.findRestaurantsByOwnerId(ownerId);
  res.json(restaurants);
}

const findAllRestaurantsByCategory = async (req, res) => {
  let result = [];
  if(req.query.category === null || req.query.category === undefined) {
    result = await foodRestaurantDao.findRestaurants();
  } else {
    const category = await foodCategoriesDao.findFoodCategories(req.query.category);
    if(category.length !== 0) {
      result = await foodRestaurantDao.findRestaurantsByCategory(category[0]._id);
    }
  }

  res.json(result);
}

export default (app) => {
  app.get("/api/foodRestaurants", findAllRestaurantsByCategory);
  app.get("/api/foodRestaurants", findAllRestaurants);
  app.get("/api/foodRestaurants/:ownerId", findAllRestaurantsByOwnerId);
}