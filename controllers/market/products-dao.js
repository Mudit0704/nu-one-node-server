import productsModel from "./products-model.js";

export const findAllProducts = () => productsModel.find();

export const searchProductsByName = (name) => productsModel.find({name: {$regex: name, $options: "i"}});

export const searchSellerProductsByName = (sellerId, name) => productsModel.find({seller_id: sellerId, name: {$regex: name, $options: "i"}});

export const findProductsBySellerId = (sellerId) => productsModel.find({seller_id: sellerId});

export const createProduct = (product) => productsModel.create(product);

export const deleteProduct = (id) => productsModel.findByIdAndDelete(id);

export const updateProduct = (id, product) => productsModel.updateOne({_id: id}, {$set: product});

export const reduceProductQuantity = (id, quantity) => productsModel.updateOne({_id: id}, {$inc: {quantity: -quantity}});