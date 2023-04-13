import orders from "./orders.js";
let orderArray = orders;

const createOrder = (req, res) => {
  const newOrder = req.body;
  newOrder._id = (new Date()).getTime();
  newOrder.date = (new Date()).toDateString();
  orderArray.push(newOrder);
  res.json(newOrder);
}

const findOrders = (req, res) => {
  res.json(orderArray);
}

const updateFoodOrders = (req, res) => {
  const orderIdToUpdate = parseInt(req.params.orderId);
  // console.log(orderIdToUpdate)
  const updates = req.body;
  const orderIndex = orderArray.findIndex(
      item => item._id === orderIdToUpdate
  )
  orderArray[orderIndex] = {...orderArray[orderIdToUpdate], ...updates};
  res.json(req.body);
}


export default (app) => {
  app.get("/api/foodOrders", findOrders);
  app.post("/api/foodOrders", createOrder);
  app.put("/api/foodOrders/:orderId", updateFoodOrders);
}