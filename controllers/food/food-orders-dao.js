import foodOrderModel from './food-order-model.js';

export const findFoodOrdersById = (orderId) => foodOrderModel.find({_id: orderId});

export const findFoodOrdersByRestaurantId = (restaurant_id) => foodOrderModel.find({restaurant_id: restaurant_id});

export const findFoodOrdersByUserId = (userId) => foodOrderModel.find({userId: userId});

export const createFoodOrder = (order) => foodOrderModel.create(order);

export const deleteFoodOrder = (orderId) => foodOrderModel.deleteOne({_id: orderId});

export const updateFoodOrder = (orderId, order) => foodOrderModel.updateOne({_id: orderId}, {$set: order})