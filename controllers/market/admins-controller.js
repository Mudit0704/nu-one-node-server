import users from "./admins.js";
let admins = users.filter((user) => user.sub_type === "MARKET_ADMIN" && user.type === "Admin");

const findMarketAdmins = (req, res) => {
  res.json(admins);
}

const deleteMarketAdmin = (req, res) => {
  const adminIdToDelete = req.params.aid;
  const admin = admins.find((admin) =>
      admin._id === parseInt(adminIdToDelete));
  admins = admins.filter((admin) =>
      admin._id !== parseInt(adminIdToDelete));
  res.json(admin);
}

export default (app) => {
  app.get('/api/market_admins', findMarketAdmins);
  app.delete('/api/market_admins/:aid', deleteMarketAdmin);
}