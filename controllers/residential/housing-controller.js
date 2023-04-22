import * as housingDao from "./housing-dao.js"
import {findHouseById} from "./housing-dao.js";


const HousingController = (app) => {
    app.get('/api/houses', findHouses)
    app.get('/api/houses/:uid', findUserById);
    app.post('/api/houses', createHouse);
}

const findHouses = async (req, res) => {
    const house = await housingDao.findHouses()
    res.json(house)
}

const createHouse = async (req, res) => {
    const newHouse = req.body;
    newHouse._id = (new Date()).getTime() + '';
    const insertedHouse = await housingDao
        .createHouses(newHouse);
    res.json(insertedHouse);
}

const findUserById =  (req, res) => {
    const userId = req.params.uid;
    const user = users
        .find(u => u._id === userId);
    res.json(user);
}

export default HousingController;

