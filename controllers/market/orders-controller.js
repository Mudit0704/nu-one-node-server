import * as ordersDao from "./orders-dao.js";

const findOrders = async (req, res) => {
  const userOrder = await ordersDao.findUserOrders("64389aff584213571e028582");
  res.json(userOrder.orders);
}

const updateOrder = async (req, res) => {
  const orderId = req.params.oid;
  await ordersDao.updateUserOrderStatus("64389aff584213571e028582", orderId, req.body.status);

  res.json(req.body);
}

const createOrder = async (req, res) => {
  const newOrder = req.body;
  newOrder._id = (new Date()).getTime();
  newOrder.date = (new Date()).toDateString();
  newOrder.status = "Ordered";

  const exists = await ordersDao.findUserOrderExists("64389aff584213571e028582");
  if (!exists) {
    await ordersDao.createUserOrder("64389aff584213571e028582", newOrder);
  } else {
    await ordersDao.addUserOrder("64389aff584213571e028582", newOrder);
  }

  res.json(newOrder);
}

export default (app) => {
  app.get('/api/orders', findOrders);
  app.put('/api/orders/:oid', updateOrder);
  app.post('/api/orders', createOrder);
}