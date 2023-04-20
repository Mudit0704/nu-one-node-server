import * as foodItemsDao from "./food-items-dao.js"
import * as foodCategoriesDao from "./food-categories-dao.js";
import * as foodRestaurantDao from "./food-restaurant-dao.js";

import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/foodImages")
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
});

const upload = multer({storage: storage});


const createMenuItem = async (req, res) => {
  const ownerId = req.body.ownerId;

  const data = fs.readFileSync("./public/foodImages/" + req.file.originalname);
  const contentType = "image/png";

  let newItem = {
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    price: req.body.price,
    calories: req.body.calories,
    image: {
      data: data,
      contentType: contentType
    },
    categories: [],
    restaurant_id: 0,
  }

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
  let categories = menu_items[0].categories;
  let newCategories = [];
  for (const category of categories) {
    const categoryName = await foodCategoriesDao.findFoodCategoriesById(category);
    newCategories.push(categoryName[0].category)
  }
  const updatedMenuItems = { ...menu_items[0].toObject(), categories: newCategories };

  res.json([updatedMenuItems]);
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
  let menu_items = await foodItemsDao.findFoodItemsByRestaurantId(restaurant_id);
  if(menu_items.length === 0) {
    const restaurant = await foodRestaurantDao.findRestaurantsByOwnerId(restaurant_id);
    if(restaurant.length !== 0) {
      menu_items = await foodItemsDao.findFoodItemsByRestaurantId(restaurant[0]._id);
    }
  }
  res.json(menu_items);
}

const deleteMenuItems = async (req, res) => {
  const itemIdToDelete = req.params.itemId;
  const foodItem = await foodItemsDao.findFoodItemsByItemId(itemIdToDelete);
  const status = await foodItemsDao.deleteFoodItem(itemIdToDelete);
  await foodRestaurantDao.deleteRestaurantFoodItem(foodItem[0].restaurant_id, itemIdToDelete)
  res.json(req.params.itemId);
}

const updateMenuItems = async (req, res) => {
  const itemIdToUpdate = req.params.itemId;
  const updates = req.body;

  updates.categories = [];
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
  app.get("/api/menu/:restaurant_id", findMenuItemsByRestaurant)
  app.get("/api/menu/search/:restaurant_id", findMenuItemsByRestaurantSearchTerm)
  app.post("/api/menu/", upload.single('userImage'), createMenuItem);
  app.get("/api/menu/menuItems/:menuItemId", findMenuItemsById);
  app.put("/api/menu/:itemId", updateMenuItems);
  app.delete("/api/menu/:itemId", deleteMenuItems);
}