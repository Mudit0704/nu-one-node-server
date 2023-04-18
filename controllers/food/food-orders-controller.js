import * as foodOrderDao from "./food-orders-dao.js"
import * as foodRestaurantDao from "./food-restaurant-dao.js"

const createOrder = async (req, res) => {
  const newOrder = req.body;
  const insertedOrder = await foodOrderDao.createFoodOrder(newOrder)
  res.json(insertedOrder);
}

const findOrders = async (req, res) => {
  const userId = req.params.userId;
  const restaurant = await foodRestaurantDao.findRestaurantsByOwnerId(userId)
  let orders;
  if(restaurant === null || restaurant === undefined || restaurant.length === 0) {
    orders = await foodOrderDao.findFoodOrdersByUserId(userId)
  } else {
    orders = await foodOrderDao.findFoodOrdersByRestaurantId(restaurant[0]._id)
  }
  res.json(orders);
}

const updateFoodOrders = async (req, res) => {
  const orderIdToUpdate = req.params.orderId;
  const updates = req.body;
  const status = await foodOrderDao.updateFoodOrder(orderIdToUpdate,updates);
  res.json(status);
}


export default (app) => {
  app.get("/api/foodOrders/:userId", findOrders);
  app.post("/api/foodOrders", createOrder);
  app.put("/api/foodOrders/:orderId", updateFoodOrders);
}