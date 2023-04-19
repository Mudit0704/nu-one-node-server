import * as foodItemsDao from "./food-items-dao.js"
import * as foodCategoriesDao from "./food-categories-dao.js";
import * as foodRestaurantDao from "./food-restaurant-dao.js";

const restaurant_id = "6439689e5f33ffcba66771e2"; //to be managed through sessions.

const createMenuItem = async (req, res) => {
  const newItem = req.body;
  newItem.categories = [];
  const ownerId = req.body.ownerId;

  const restaurant = await foodRestaurantDao.findRestaurantsByOwnerId(ownerId);
  for (const category of req.body.category) {
    const categoryObj = await foodCategoriesDao.findFoodCategories(category);
    newItem.categories.push(categoryObj[0]._id)
  }

  newItem.restaurant_id = restaurant[0]._id;
  const insertedFoodItem = await foodItemsDao.createFoodItems(newItem);
  await foodRestaurantDao.addToRestaurantMenu(newItem.restaurant_id, insertedFoodItem)
  res.json(insertedFoodItem);
}

const findMenuItems = async (req, res) => {
  const menu_items = await foodItemsDao.findFoodItems();
  res.json(menu_items);
}

const findMenuItemsById = async (req, res) => {
  const menu_items = await foodItemsDao.findFoodItemsByItemId(req.params.menuItemId);
  res.json(menu_items);
}

const findMenuItemsByRestaurantSearchTerm = async (req, res) => {
  const restaurant_id = req.params.restaurant_id;

  let result = [];
  if(req.query.name === null || req.query.name === undefined) {
    result = await foodItemsDao.findFoodItemsByRestaurantId(restaurant_id);
  } else {
    let items = await foodItemsDao.findFoodItemsByNameAndRestaurant(req.query.name, restaurant_id);

    if(items.length !== 0) {
      result = items;
    }
  }

  res.json(result);
}

const findMenuItemsByRestaurant = async (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const menu_items = await foodItemsDao.findFoodItemsByRestaurantId(restaurant_id);
  res.json(menu_items);
}

const deleteMenuItems = async (req, res) => {
  const itemIdToDelete = req.params.itemId;
  const foodItem = await foodItemsDao.findFoodItemsByItemId(itemIdToDelete);
  const status = await foodItemsDao.deleteFoodItem(itemIdToDelete);
  await foodRestaurantDao.deleteRestaurantFoodItem(foodItem[0].restaurant_id, itemIdToDelete)
  res.json(status);
}

const updateMenuItems = async (req, res) => {
  const itemIdToUpdate = req.params.itemId;
  const updates = req.body;

  const item = await foodItemsDao.findFoodItemsByItemId(itemIdToUpdate)
  for (const category of req.body.category) {
    const categoryObj = await foodCategoriesDao.findFoodCategories(category);
    updates.categories.push(categoryObj[0]._id)
  }

  delete updates['category'];

  const status = await foodItemsDao.updateFoodItem(itemIdToUpdate,updates);
  await foodRestaurantDao.updateRestaurantMenuItem(item[0].restaurant_id, item[0]._id, updates)
  res.json(status);
}

export default (app) => {
  app.get("/api/menu", findMenuItems);
  app.get("/api/menu/:restaurant_id", findMenuItemsByRestaurantSearchTerm)
  app.get("/api/menu/:restaurant_id", findMenuItemsByRestaurant)
  app.post("/api/menu/", createMenuItem);
  app.get("/api/menu/menuItems/:menuItemId", findMenuItemsById);
  app.put("/api/menu/:itemId", updateMenuItems);
  app.delete("/api/menu/:itemId", deleteMenuItems);
}