import * as housingDao from "./housing-dao.js"
import {findHouseById} from "./housing-dao.js";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/residentialImages")
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
});

const upload = multer({storage: storage});

const HousingController = (app) => {
    app.get('/api/houses', findHouses)
    app.get('/api/houses/:uid', findUserById);
    app.post('/api/houses', upload.single('image'), createHouse);
}

const findHouses = async (req, res) => {
    const house = await housingDao.findHouses()
    res.json(house)
}

const createHouse = async (req, res) => {
    const data = fs.readFileSync("./public/residentialImages/" + req.file.originalname);
    const contentType = "image/png";

    const newHouse = {
        houseName: req.body.name,
        HouseDescription: req.body.description,
        rent: req.body.rent,
        streetAddress: req.body.streetAddress,
        bedrooms: req.body.bedroom,
        image: {
            data: data,
            contentType: contentType
        },
        bathrooms: req.body.bathroom
    }

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

