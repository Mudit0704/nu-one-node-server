import menuItems from "./menu-items.js";
let menu_items = menuItems;

const createMenuItem = (req, res) => {
  const newItem = req.body;
  newItem._id = (new Date()).getTime();
  menu_items.push(newItem);
  res.json(newItem);
}

const findMenuItems = (req, res) => {
  res.json(menu_items);
}

const deleteMenuItems = (req, res) => {
  const itemIdToDelete = parseInt(req.params.itemId);
  menu_items = menu_items.filter(item => item._id !== itemIdToDelete);
  res.sendStatus(200);
}

const updateMenuItems = (req, res) => {
  const itemIdToUpdate = parseInt(req.params.itemId);
  const updates = req.body;
  const itemIndex = menu_items.findIndex(
      item => item._id === itemIdToUpdate
  )
  menu_items[itemIndex] = {...menu_items[itemIndex], ...updates};
  res.sendStatus(200);
}

export default (app) => {
  app.get("/api/menu", findMenuItems);
  app.post("/api/menu", createMenuItem);
  app.put("/api/menu/:itemId", updateMenuItems);
  app.delete("/api/menu/:itemId", deleteMenuItems);
}