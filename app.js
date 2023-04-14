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
import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/nuOne');

const app = express();
app.use(cors());
app.use(express.json());
ProductsController(app);
AdminsController(app);
CartsController(app);
OrdersController(app);

//Food related controllers
FoodItemsController(app);
FoodOrdersController(app);
FoodCartController(app);
FoodReviewController(app);

app.listen(4000);