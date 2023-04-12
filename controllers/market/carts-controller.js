import carts from "./carts.js";
let userCart = carts.filter((cart) => cart.user_id === 2);
let cartItems = userCart[0].items;

const findCartItems = (req, res) => {
  res.json(cartItems);
}

const deleteCartItem = (req, res) => {
  const cartItemIdToDelete = req.params.iid;
  const cartItem = cartItems.find((cartItem) =>
      cartItem._id === parseInt(cartItemIdToDelete));
  cartItems = cartItems.filter((cartItem) =>
      cartItem._id !== parseInt(cartItemIdToDelete));
  res.json(cartItem);
}

const createCartItem = (req, res) => {
  const index = cartItems.findIndex(item => item._id === req.body.item_id);
  if (index !== -1) {
    cartItems[index].quantity = cartItems[index].quantity + parseInt(req.body.quantity);
    res.json(cartItems[index]);
    return;
  }
  const newCartItem = req.body;
  cartItems.push(newCartItem);
  res.json(newCartItem);
}

const clearCart = (req, res) => {
  cartItems.splice(0, cartItems.length);
  res.json(cartItems);
}

export default (app) => {
  app.get('/api/cartItems', findCartItems);
  app.delete('/api/cartItems/:iid', deleteCartItem);
  app.post('/api/cartItems', createCartItem);
  app.delete('/api/cartItems', clearCart);
}