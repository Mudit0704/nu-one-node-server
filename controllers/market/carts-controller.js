import * as cartsDao from './carts-dao.js';

const findCartItems = async (req, res) => {
  const userId = req.params.userId;
  const result = await cartsDao.findCartByUserId(userId);
  res.json(result ? result.items : []);
}

const deleteCartItem = async (req, res) => {
  const cartItemIdToDelete = req.params.itemId;
  const userId = req.params.userId;
  const status = await cartsDao.deleteCartItem(userId, cartItemIdToDelete);

  res.json(status);
}

const createCartItem = async (req, res) => {
  const userId = req.params.userId;
  const exists = await cartsDao.findCartExists(userId);

  if (!exists) {
    await cartsDao.createCart(userId);
    await cartsDao.addCartItem(userId, req.body);
  } else {
    const currentCart = await cartsDao.findCartByUserId(userId);


    if (currentCart.items.length === 0) {{
      await cartsDao.addCartItem(userId, req.body);}
    } else {
      if (currentCart.items[0].seller_id.toString() !== req.body.seller_id) {
        res.status(400).send("Cannot add items from different sellers to the same cart");
        return;
      } else {
        await cartsDao.findCartItemExists(userId, req.body._id)
        .then(async (exists) => {
              if (exists) {
                const existingCartItem = await cartsDao.findCartByUserId(userId);
                await cartsDao.updateCartItemQuantity(userId,
                    req.body._id,
                    parseInt(req.body.quantity) +
                    existingCartItem.items.filter(item => item._id.toString() === req.body._id)[0].quantity);
              } else {
                console.log(req.body);
                await cartsDao.addCartItem(userId,
                    req.body);
              }
            }
        );
      }
    }
  }

  res.json(req.body);
}

const clearCart = async (req, res) => {
  const userId = req.params.userId;
  const status = await cartsDao.clearCart(userId);
  res.json(status);
}

export default (app) => {
  app.get('/api/cartItems/:userId', findCartItems);
  app.delete('/api/cartItems/:userId/:itemId', deleteCartItem);
  app.post('/api/cartItems/:userId', createCartItem);
  app.delete('/api/cartItems/:userId', clearCart);
}