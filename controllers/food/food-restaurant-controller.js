import * as foodRestaurantDao from "./food-restaurant-dao.js"

const findAllRestaurants = async (req, res) => {
  const restaurants = await foodRestaurantDao.findRestaurants();
  // console.log(restaurants)
  res.json(restaurants);
}

export default (app) => {
  app.get("/api/foodRestaurants", findAllRestaurants);
}