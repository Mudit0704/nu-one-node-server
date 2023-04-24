import * as ordersDao from "./orders-dao.js";
import * as usersDao from "../users/users-dao.js";

const findUserOrders = async (req, res) => {
  const userId = req.params.userId;
  const { role } = await usersDao.findUserRole(userId);

  if (role === "marketAdmin") {
    const sellerOrders = await ordersDao.findSellerOrders(userId);
    res.json(sellerOrders ? sellerOrders : []);
    return;
  }

  const userOrder = await ordersDao.findUserOrders(userId);
  res.json(userOrder ? userOrder.orders : []);
}

const updateOrder = async (req, res) => {
  const orderId = req.params.oid;
  await ordersDao.updateOrderStatus(orderId, req.body.status);

  res.json(req.body);
}

const createOrder = async (req, res) => {
  const userId = req.params.userId;
  const userName = req.params.userName;

  const newOrder = {
    ...req.body,
    _id : (new Date()).getTime(),
    date : (new Date()).toDateString(),
    status : "Ordered"
  }

  const exists = await ordersDao.findUserOrderExists(userId);
  if (!exists) {
    await ordersDao.createUserOrder(userId, userName, newOrder);
  } else {
    await ordersDao.addUserOrder(userId, newOrder);
  }

  res.json(newOrder);
}

const findOrdersByOrderId = async (req, res) => {
  const orderId = req.query.orderId;
  const order = await ordersDao.findOrderByOrderId(orderId);

  res.json(order ? order.orders : []);
}

export default (app) => {
  app.get('/api/orders/:userId', findUserOrders);
  app.get('/api/orders', findOrdersByOrderId);
  app.put('/api/orders/:oid', updateOrder);
  app.post('/api/orders/:userId/:userName', createOrder);
}