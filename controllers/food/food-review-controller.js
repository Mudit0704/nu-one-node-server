import * as foodReviewsDao from "./food-reviews-dao.js"
import * as usersDao from "../users/users-dao.js"
import * as foodRestaurantDao from "./food-restaurant-dao.js"
import {findReviewById} from "./food-reviews-dao.js";

const currentUser = {
  "userName": "Aadish",
  "handle": "@itsme",
  "avatar": "logo192.png",
  "likes": 0
};

const findAllReviews = async (req, res) => {
  const userReviews = await foodReviewsDao.findFoodReviews();
  res.json(userReviews);
}

const findAllReviewsByRestaurantId = async (req, res) => {
  const id = req.params.restaurant_id;
  let restaurantReviews = await foodReviewsDao.findFoodByRestaurantId(id);
  if(restaurantReviews.length === 0) {
    const restaurant = await foodRestaurantDao.findRestaurantsByOwnerId(id)
    if(restaurant.length !== 0) {
      restaurantReviews = await foodReviewsDao.findFoodByRestaurantId(restaurant[0]._id);
    }
  }
  res.json(restaurantReviews);
}

const findReviewsById = async (req, res) => {
  const id = req.params.reviewId;
  let review = await foodReviewsDao.findReviewById(id);
  res.json(review);
}

const addNewReview = async (req, res) => {
  const newReview = req.body;
  // newReview.likes = 0;
  // newReview.handle = currentUser.handle;
  newReview.avatar = currentUser.avatar; // TODO: Fetch this from the user dao
  // newReview.likes = currentUser.likes;

  const user = await usersDao.findUserById(req.body.userId);
  const restaurant = await foodRestaurantDao.findRestaurantsById(req.body.restaurant_id);
  newReview.userName = user.username;
  newReview.user_id = user._id;
  newReview.restaurantName = restaurant[0].name;

  const insertedReview = await foodReviewsDao.createFoodReview(newReview)
  res.json(insertedReview);
}

const updateFoodReview = async (req, res) => {
  const updates = req.body;
  const reviewIdToUpdate = req.params.reviewId;
  const status = await foodReviewsDao.updateFoodReview(reviewIdToUpdate, updates)
  res.json(status);
}

const deleteFoodReview = async (req, res) => {
  const reviewIdToDelete = req.params.reviewId;
  const status = await foodReviewsDao.deleteFoodReview(reviewIdToDelete);
  res.json(status);
}

export default (app) => {
  app.get("/api/foodReviews", findAllReviews);
  app.get("/api/foodReviews/:restaurant_id", findAllReviewsByRestaurantId);
  app.get("/api/foodReviews/findReview/:reviewId", findReviewsById);
  app.post("/api/foodReviews", addNewReview);
  app.put("/api/foodReviews/:reviewId", updateFoodReview);
  app.delete("/api/foodReviews/:reviewId", deleteFoodReview);
}