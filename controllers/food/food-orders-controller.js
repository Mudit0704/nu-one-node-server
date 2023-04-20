import * as foodOrderDao from "./food-orders-dao.js"
import * as foodRestaurantDao from "./food-restaurant-dao.js"
import * as usersDao from "../users/users-dao.js";

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

const findOrderById = async (req, res) => {
  // const orderId = req.params.orderId;
  // const order = await foodOrderDao.findFoodOrdersById(orderId);
  // res.json(order);
  const orderId = req.params.orderId;
  const order = await foodOrderDao.findFoodOrdersById(orderId);
  const restaurant = await foodRestaurantDao.findRestaurantsById(order[0].restaurant_id);
  const user = await usersDao.findUserById(order[0].userId);

  const newOrder = {
    ...order[0].toObject(),
    restaurantName : restaurant[0].name,
    userName : user.username
  }

  res.json([newOrder]);
}

const updateFoodOrders = async (req, res) => {
  const orderIdToUpdate = req.params.orderId;
  const updates = req.body;
  const status = await foodOrderDao.updateFoodOrder(orderIdToUpdate,updates);
  res.json(updates);
}


export default (app) => {
  app.get("/api/foodOrders/:userId", findOrders);
  app.get("/api/foodOrders/find/:orderId", findOrderById);
  app.post("/api/foodOrders", createOrder);
  app.put("/api/foodOrders/:orderId", updateFoodOrders);
}