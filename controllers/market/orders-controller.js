import ordersData from "./orders.js";
let userOrders = ordersData.filter((order) => order.user_id === 1);
let orders = userOrders[0].orders;

const findOrders = (req, res) => {
  res.json(orders);
}

const updateOrder = (req, res) => {
  const orderIdToUpdate = req.params.oid;
  const order = orders.find((order) =>
      order._id === parseInt(orderIdToUpdate));
  order.status = req.body.status;
  res.json(order);
}

const createOrder = (req, res) => {
  const newOrder = req.body;
  newOrder._id = (new Date()).getTime();
  newOrder.date = (new Date()).toDateString();
  newOrder.status = "Ordered";
  orders.unshift(newOrder);
  res.json(newOrder);
}

export default (app) => {
  app.get('/api/orders', findOrders);
  app.put('/api/orders/:oid', updateOrder);
  app.post('/api/orders', createOrder);
}