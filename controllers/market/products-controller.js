import * as productsDao from './products-dao.js';

const findProducts = async (req, res) => {
  const products = await productsDao.findAllProducts();
  res.json(products);
}

//TODO: find products by seller id
const findProductsBySellerId = async (req, res) => {
  const sellerId = req.params.sid;
  const sellerProducts = await productsDao.findProductsBySellerId(sellerId);
  res.json(sellerProducts);
}

const createProduct = async (req, res) => {
  const newProduct = req.body;
  const insertedProduct = await productsDao.createProduct(newProduct);
  res.json(insertedProduct);
}

const updateProduct = async (req, res) => {
  const productIdToUpdate = req.params.pid;
  const updates = req.body;
  const status = await productsDao.updateProduct(productIdToUpdate, updates);
  res.json(status);
}

const deleteProduct = async (req, res) => {
  const productIdToDelete = req.params.pid;
  const status = await productsDao.deleteProduct(productIdToDelete);
  res.json(status);
}

export default (app) => {
  app.get('/api/products', findProducts);
  app.get('/api/products/:sid', findProductsBySellerId);
  app.post('/api/products', createProduct);
  app.put('/api/products/:pid', updateProduct);
  app.delete('/api/products/:pid', deleteProduct);
}