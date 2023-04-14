import * as foodItemsDao from "./food-items-dao.js"

const restaurant_id = "6439689e5f33ffcba66771e2"; //to be managed through sessions.

const createMenuItem = async (req, res) => {
  const newItem = req.body;
  newItem.restaurant_id = restaurant_id;
  const insertedFoodItem = await foodItemsDao.createFoodItems(newItem);
  res.json(insertedFoodItem);
}

const findMenuItems = async (req, res) => {
  const menu_items = await foodItemsDao.findFoodItems();
  res.json(menu_items);
}

const deleteMenuItems = async (req, res) => {
  const itemIdToDelete = req.params.itemId;
  const status = await foodItemsDao.deleteFoodItem(itemIdToDelete);
  res.json(status);
}

const updateMenuItems = async (req, res) => {
  const itemIdToUpdate = req.params.itemId;
  const updates = req.body;
  const status = await foodItemsDao.updateFoodItem(itemIdToUpdate,updates);
  res.json(status);
}

export default (app) => {
  app.get("/api/menu", findMenuItems);
  app.post("/api/menu", createMenuItem);
  app.put("/api/menu/:itemId", updateMenuItems);
  app.delete("/api/menu/:itemId", deleteMenuItems);
}