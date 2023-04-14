import productsModel from "./products-model.js";

export const findAllProducts = () => productsModel.find();

export const findProductById = (id) => productsModel.findById(id);

export const findProductsBySellerId = (sellerId) => productsModel.find({seller_ids: sellerId});

export const createProduct = (product) => productsModel.create(product);

export const deleteProduct = (id) => productsModel.findByIdAndDelete(id);

export const updateProduct = (id, product) => productsModel.updateOne({_id: id}, {$set: product});