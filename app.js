import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as fs from "fs";
import * as path from "path";
import multer from "multer";
import ProductsController from "./controllers/market/products-controller.js";
import AdminsController from "./controllers/market/admins-controller.js";
import CartsController from "./controllers/market/carts-controller.js";
import OrdersController from "./controllers/market/orders-controller.js";
import FoodItemsController from "./controllers/food/food-items.js";
import FoodOrdersController from "./controllers/food/food-orders-controller.js";
import FoodCartController from "./controllers/food/food-cart-controller.js";
import FoodReviewController from "./controllers/food/food-review-controller.js";
import FoodRestaurantController from "./controllers/food/food-restaurant-controller.js";
import AuthController from "./controllers/users/auth-controller.js";

import mongoose from "mongoose";
import session from "express-session";

try {
  mongoose.connect('mongodb://127.0.0.1:27017/nuOne');
} catch (e) {
  console.log(e);
}


const app = express();
app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
);
app.use(
    cors(
        {
          origin: "http://localhost:3000",
          credentials: true,
        }
    ));
app.use(express.json());

AuthController(app);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// const upload = multer({storage: storage});

ProductsController(app);
AdminsController(app);
CartsController(app);
OrdersController(app);

//Food related controllers
FoodItemsController(app);
FoodOrdersController(app);
FoodCartController(app);
FoodReviewController(app);
FoodRestaurantController(app);

// app.post('/api/uploadImage', upload.single('image'), (req, res, next) => {
//
//   console.log(req.body);
//   console.log(req.file);
//   const obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(
//           path.join(__dirname + '/uploads/' + req.file.filename)),
//       contentType: 'image/png'
//     }
//   };
//   imgSchema.create(obj)
//   .then ((err, item) => {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       // item.save();
//       res.redirect('/');
//     }
//   });
// });


app.listen(4000);