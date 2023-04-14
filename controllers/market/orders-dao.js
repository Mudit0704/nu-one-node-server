import ordersModel from "./orders-model.js";

export const findUserOrders = (userId) => ordersModel.findOne({_id: userId});

export const updateUserOrderStatus = (userId, orderId, status) => ordersModel.updateOne({_id: userId, "orders._id": orderId}, {$set: {"orders.$.status": status}});

export const findUserOrderExists = (userId) => ordersModel.exists({_id: userId});

export const createUserOrder = (userId, order) => ordersModel.create({_id: userId, order: order});

export const addUserOrder = (userId, order) => ordersModel.updateOne({_id: userId}, {$push: {orders: order}});