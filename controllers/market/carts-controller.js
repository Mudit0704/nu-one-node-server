import * as cartsDao from './carts-dao.js';

const findCartItems = async (req, res) => {
  const result = await cartsDao.findCartByUserId("643855e4584213571e02854c");
  res.json(result.items);
}

const deleteCartItem = async (req, res) => {
  const cartItemIdToDelete = req.params.iid;
  const status = await cartsDao.deleteCartItem("643855e4584213571e02854c", cartItemIdToDelete);

  res.json(status);
}

const createCartItem = async (req, res) => {
  const exists = await cartsDao.findCartExists("643855e4584213571e02854c");

  if (!exists) {
    await cartsDao.createCart("643855e4584213571e02854c");
    await cartsDao.addCartItem("643855e4584213571e02854c", req.body);
  } else {
    await cartsDao.findCartItemExists("643855e4584213571e02854c", req.body._id)
      .then(async (exists) => {
        if (exists) {
          const existingCartItem = await cartsDao.findCartByUserId("643855e4584213571e02854c");
          await cartsDao.updateCartItemQuantity("643855e4584213571e02854c",
              req.body._id,
              req.body.quantity +
              existingCartItem.items.filter(item => item._id == req.body._id)[0].quantity);
        } else {
          await cartsDao.addCartItem("643855e4584213571e02854c",
              req.body);
        }
      }
    );
  }

  res.json(req.body);
}

const clearCart = async (req, res) => {
  const status = await cartsDao.clearCart("643855e4584213571e02854c");
  res.json(status);
}

export default (app) => {
  app.get('/api/cartItems', findCartItems);
  app.delete('/api/cartItems/:iid', deleteCartItem);
  app.post('/api/cartItems', createCartItem);
  app.delete('/api/cartItems', clearCart);
}