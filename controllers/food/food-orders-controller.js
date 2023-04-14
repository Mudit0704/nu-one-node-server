import * as foodOrderDao from "./food-orders-dao.js"

const restaurant_id = "6439689e5f33ffcba66771e2"; //to be managed through sessions.

const createOrder = async (req, res) => {
  const newOrder = req.body;
  newOrder.restaurant_id = restaurant_id;
  const insertedOrder = await foodOrderDao.createFoodOrder(newOrder)
  res.json(insertedOrder);
}

const findOrders = async (req, res) => {
  const orders = await foodOrderDao.findFoodOrders()
  res.json(orders);
}

const findOrdersByRestaurantId = async (req, res) => {
  const restaurantId = req.params.restaurant_id;
  const orders = await foodOrderDao.findFoodOrdersByRestaurantId(restaurantId)
  res.json(orders);
}

const updateFoodOrders = async (req, res) => {
  const orderIdToUpdate = req.params.orderId;
  const updates = req.body;
  const status = await foodOrderDao.updateFoodOrder(orderIdToUpdate,updates);
  res.json(status);
}


export default (app) => {
  app.get("/api/foodOrders", findOrders);
  app.get("/api/foodOrders/:restaurant_id", findOrdersByRestaurantId)
  app.post("/api/foodOrders", createOrder);
  app.put("/api/foodOrders/:orderId", updateFoodOrders);
}