import * as foodCartDao from "./food-cart-dao.js";
let user_id = "643855e4584213571e02854c"

const findFoodCartItems = async (req, res) => {
  const cartArray = await foodCartDao.findFoodCartByUserId(user_id);
  res.json(cartArray[0].items);
}

const deleteFoodCartItems = async (req, res) => {
  const itemIdToDelete = req.params.itemId;
  const status = await foodCartDao.deleteFoodCartItem(user_id, itemIdToDelete);
  res.json(status);
}

const addToFoodCart = async (req, res) => {
  const exists = await foodCartDao.findFoodCartExists(user_id);

  if (!exists) {
    await foodCartDao.createFoodCart(user_id);
    await foodCartDao.addFoodCartItem(user_id, req.body);
  } else {
    await foodCartDao.findFoodCartItemExists(user_id, req.body._id)
    .then(async (exists) => {
          if (exists) {
            const existingCartItem = await foodCartDao.findFoodCartByUserId(user_id);
            await foodCartDao.updateFoodCartItem(user_id,
                req.body._id,
                (req.body.quantity) +
                existingCartItem[0].items.filter(item => item._id.equals(req.body._id))[0].quantity);
          } else {
            await foodCartDao.addFoodCartItem(user_id,
                req.body);
          }
        }
    );
  }
  res.json(req.body)
}

const clearFoodCart = async (req, res) => {
  const status = await foodCartDao.clearFoodCart(user_id);
  res.json(status);
}

export default (app) => {
  app.get("/api/foodCart", findFoodCartItems);
  app.delete("/api/foodCart/:itemId", deleteFoodCartItems);
  app.delete("/api/foodCart/", clearFoodCart);
  app.post("/api/foodCart/", addToFoodCart);
}