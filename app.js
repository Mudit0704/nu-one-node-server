import express from 'express';
import cors from 'cors';
import ProductsController from "./controllers/market/products-controller.js";

const app = express();
app.use(cors());
app.use(express.json());
ProductsController(app);
app.listen(4000);