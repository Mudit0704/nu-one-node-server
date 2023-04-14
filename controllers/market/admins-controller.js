import * as adminsDao from "./admins-dao.js";

const findMarketAdmins = async (req, res) => {
  const admins = await adminsDao.findAllMarketAdmins();
  res.json(admins);
}

const deleteMarketAdmin = async (req, res) => {
  const adminIdToDelete = req.params.aid;
  const status = await adminsDao.deleteMarketAdmin(adminIdToDelete);
  res.json(status);
}

export default (app) => {
  app.get('/api/marketAdmins', findMarketAdmins);
  app.delete('/api/marketAdmins/:aid', deleteMarketAdmin);
}