import foodReviews from "./food-reviews.js";
let userReviews = foodReviews.filter(review => review.user_id === 3)

const currentUser = {
  "userName": "Aadish",
  "handle": "@itsme",
  "avatar": "logo192.png",
  "likes": 0
};

const findAllReviews = (req, res) => {
  res.json(userReviews);
}

const addNewReview = (req, res) => {
  let newReview = req.body;

  newReview._id = (new Date()).getTime();
  newReview.likes = 0;
  newReview.userName = currentUser.userName;
  newReview.handle = currentUser.handle;
  newReview.avatar = currentUser.avatar;
  newReview.likes = currentUser.likes;
  userReviews.push(newReview)
  res.json(newReview);
}

const updateFoodReview = (req, res) => {
  const updates = req.body;
  const reviewIdToUpdate = parseInt(req.params.reviewId);
  const reviewIndex = userReviews.findIndex(
      (t) => t._id === reviewIdToUpdate)
  userReviews[reviewIndex] =
      {...userReviews[reviewIndex], ...updates};
  res.json(userReviews[reviewIndex]);
}

const deleteFoodReview = (req, res) => {
  const reviewIdToDelete = parseInt(req.params.reviewId);
  userReviews = userReviews.filter(review => review._id !== reviewIdToDelete);
  res.send(reviewIdToDelete);
}

export default (app) => {
  app.get("/api/foodReviews", findAllReviews);
  app.post("/api/foodReviews", addNewReview);
  app.put("/api/foodReviews/:reviewId", updateFoodReview);
  app.delete("/api/foodReviews/:reviewId", deleteFoodReview);
}