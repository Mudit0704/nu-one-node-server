import foodCartModel from "./food-cart-model.js";

export const findFoodCart = () => foodCartModel.find();

export const findFoodCartByUserId = (user_id) => foodCartModel.find({_id: user_id});

export const findFoodCartExists = (userId) => foodCartModel.exists({_id: userId});

export const createFoodCart = (userId) => foodCartModel.create({_id: userId, items: []});

export const deleteFoodCartItem = (userId, itemId) => foodCartModel.updateOne({_id: userId}, {$pull: {items : {_id : itemId}}});

export const clearFoodCart = (userId) => foodCartModel.updateOne({_id: userId}, {$set: {items: []}});

export const findFoodCartItemExists = (userId, itemId) => foodCartModel.exists({_id: userId, "items._id": itemId});

export const addFoodCartItem = (userId, item) => foodCartModel.updateOne({_id: userId}, {$push: {items: item}});

export const updateFoodCartItem = (userId, itemId, quantity) => foodCartModel.updateOne({_id: userId, "items._id": itemId}, {$set: {"items.$.quantity": quantity}})