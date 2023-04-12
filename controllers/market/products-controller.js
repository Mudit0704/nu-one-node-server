import items from "./products.js";
let products = items;

const findProducts = (req, res) => {
  res.json(products);
}

//TODO: find products by seller id
const findProductsBySellerId = (req, res) => {
  const sellerId = req.params.sid;
  const sellerProducts = products.filter((product) => product.seller_ids.includes(sellerId));
  res.json(sellerProducts);
}

const createProduct = (req, res) => {
  const newProduct = req.body;
  newProduct._id = (new Date()).getTime();
  products.unshift(newProduct);
  res.json(newProduct);
}

const updateProduct = (req, res) => {
  const productIdToUpdate = req.params.pid;
  const updates = req.body;
  const product = products.find((product) =>
      product._id === parseInt(productIdToUpdate));
  product.seller_ids = updates.seller_ids;
  product.name = updates.name;
  product.brand = updates.brand;
  product.description = updates.description;
  product.price = updates.price;
  product.quantity = updates.quantity;
  product.image = updates.image;
  product.rating = updates.rating;
  res.json(product);
}

const deleteProduct = (req, res) => {
  const productIdToDelete = req.params.pid;
  const product = products.find((product) =>
      product._id === parseInt(productIdToDelete));
  products = products.filter((product) =>
      product._id !== parseInt(productIdToDelete));
  res.json(product);
}

export default (app) => {
  app.get('/api/products', findProducts);
  app.get('/api/products/:sid', findProductsBySellerId);
  app.post('/api/products', createProduct);
  app.put('/api/products/:pid', updateProduct);
  app.delete('/api/products/:pid', deleteProduct);
}