import cart from "./food-cart.js";
let userCart = cart.filter((cart) => cart.user_id === 1);
let cartArray = userCart[0].items;

const findFoodCartItems = (req, res) => {
  res.json(cartArray);
}

const deleteFoodCartItems = (req, res) => {
  const itemIdToDelete = parseInt(req.params.itemId);
  cartArray = cartArray.filter(item => item._id !== itemIdToDelete);
  res.json(itemIdToDelete);
}

const addToFoodCart = (req, res) => {
  const index = cartArray.findIndex(item => item._id === parseInt(req.body._id));
  let response;
  if (index !== -1) {
    cartArray[index].quantity = parseInt(cartArray[index].quantity) + parseInt(req.body.quantity);
    response = cartArray[index];
  } else {
    const newCartItem = req.body;
    cartArray.push(newCartItem);
    response = newCartItem;
  }
  res.json(response)
}

const clearFoodCart = (req, res) => {
  cartArray.splice(0, cartArray.length);
  res.json(cartArray);
}

export default (app) => {
  app.get("/api/foodCart", findFoodCartItems);
  app.delete("/api/foodCart/:itemId", deleteFoodCartItems);
  app.delete("/api/foodCart/", clearFoodCart);
  app.post("/api/foodCart/", addToFoodCart);
}