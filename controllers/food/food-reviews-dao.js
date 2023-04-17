import foodReviewsModel from './food-reviews-model.js';

export const findFoodReviews = () => foodReviewsModel.find();

export const findFoodByUserId = (user_id) => foodReviewsModel.find({user_id: user_id});

export const findFoodByRestaurantId = (restaurant_id) => foodReviewsModel.find({restaurant_id: restaurant_id});

export const createFoodReview = (review) => foodReviewsModel.create(review);

export const deleteFoodReview = (reviewId) => foodReviewsModel.deleteOne({_id: reviewId});

export const updateFoodReview = (reviewId, review) => foodReviewsModel.updateOne({_id: reviewId}, {$set: review})