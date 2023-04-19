import express from 'express';
import cors from 'cors';
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
import CareerCompanyController from "./controllers/career/companyController.js";
import CareerUserController from "./controllers/career/userController.js";
import CareerJobController from "./controllers/career/jobController.js";

import mongoose from "mongoose";
import session from "express-session";

mongoose.connect('mongodb://127.0.0.1:27017/nuOne');

const app = express();
// app.use(
//     session({
//       secret: "secret",
//       resave: false,
//       saveUninitialized: false,
//     })
// );
app.use(
    cors(
        {
          origin: "http://localhost:3000",
          credentials: true,
        }
    ));
app.use(express.json());
AuthController(app);
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

//Career related controllers
CareerJobController(app);
CareerCompanyController(app);
CareerUserController(app);

app.listen(4000);