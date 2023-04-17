import cartsModel from "./carts-model.js";

export const findCartByUserId = (userId) => cartsModel.findOne({_id: userId});

export const deleteCartItem = (userId, itemId) => cartsModel.updateOne({_id: userId}, {$pull: {items : {_id : itemId}}});

export const clearCart = (userId) => cartsModel.updateOne({_id: userId}, {$set: {items: []}});

export const findCartExists = (userId) => cartsModel.exists({_id: userId});

export const createCart = (userId) => cartsModel.create({_id: userId, items: []});

export const findCartItemExists = (userId, itemId) => cartsModel.exists({_id: userId, "items._id": itemId});

export const updateCartItemQuantity = (userId, itemId, quantity) => cartsModel.updateOne({_id: userId, "items._id": itemId}, {$set: {"items.$.quantity": quantity}});

export const addCartItem = (userId, item) => {
  return cartsModel.updateOne({_id: userId}, {$push: {items: item}});
}