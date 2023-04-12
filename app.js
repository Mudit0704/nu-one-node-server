import express from 'express';
import cors from 'cors';
import ProductsController from "./controllers/market/products-controller.js";
import AdminsController from "./controllers/market/admins-controller.js";
import CartsController from "./controllers/market/carts-controller.js";
import OrdersController from "./controllers/market/orders-controller.js";

const app = express();
app.use(cors());
app.use(express.json());
ProductsController(app);
AdminsController(app);
CartsController(app);
OrdersController(app);
app.listen(4000);