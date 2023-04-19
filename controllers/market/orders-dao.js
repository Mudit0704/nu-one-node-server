import ordersModel from "./orders-model.js";

export const findUserOrders = (userId) => ordersModel.findOne({_id: userId});

export const updateOrderStatus = (orderId, status) => ordersModel.updateOne({"orders._id": orderId}, {$set: {"orders.$.status": status}});

export const findUserOrderExists = (userId) => ordersModel.exists({_id: userId});

export const createUserOrder = (userId, order) => ordersModel.create({_id: userId, orders: order});

export const addUserOrder = (userId, order) => ordersModel.updateOne({_id: userId}, {$push: {orders: order}});

export const findSellerOrders = (sellerId) => ordersModel.find({"orders.items.seller_id": sellerId});

export const findOrderByOrderId = (orderId) => ordersModel.findOne({"orders._id": orderId});