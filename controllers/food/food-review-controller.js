import * as foodReviewsDao from "./food-reviews-dao.js"

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
  const restaurantId = req.params.restaurant_id;
  const restaurantReviews = await foodReviewsDao.findFoodByRestaurantId(restaurantId);
  res.json(restaurantReviews);
}

const addNewReview = async (req, res) => {
  const newReview = req.body;
  newReview.likes = 0;
  newReview.userName = currentUser.userName;
  newReview.handle = currentUser.handle;
  newReview.avatar = currentUser.avatar;
  newReview.likes = currentUser.likes;

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
  app.post("/api/foodReviews", addNewReview);
  app.put("/api/foodReviews/:reviewId", updateFoodReview);
  app.delete("/api/foodReviews/:reviewId", deleteFoodReview);
}