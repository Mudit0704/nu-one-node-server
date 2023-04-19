import * as productsDao from './products-dao.js';

const findProducts = async (req, res) => {
  const products = await productsDao.findAllProducts();
  res.json(products);
}

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

const searchProductsByName = async (req, res) => {
  if (req.query.name === undefined || req.query.name === null) {
    findProducts(req, res);
    return;
  }
  const name = req.query.name;
  const products = await productsDao.searchProductsByName(name);
  res.json(products);
}

const searchSellerProductsByName = async (req, res) => {
  if (req.query.name === undefined || req.query.name === null) {
    findProductsBySellerId(req, res);
    return;
  }

  const sellerId = req.params.sid;
  const name = req.query.name;
  const products = await productsDao.searchSellerProductsByName(sellerId, name);
  res.json(products);
}

const reduceProductQuantity = async (req, res) => {
  const productIdToUpdate = req.params.pid;
  const quantity = req.params.quantity;
  await productsDao.reduceProductQuantity(productIdToUpdate, quantity);
  res.json({_id: req.params.pid, quantity: req.params.quantity});
}

export default (app) => {
  app.get('/api/products', searchProductsByName);
  app.get('/api/products', findProducts);
  app.get('/api/products/:sid', searchSellerProductsByName);
  app.get('/api/products/:sid', findProductsBySellerId);
  app.post('/api/products', createProduct);
  app.put('/api/products/:pid', updateProduct);
  app.put('/api/products/:pid/:quantity', reduceProductQuantity);
  app.delete('/api/products/:pid', deleteProduct);
}