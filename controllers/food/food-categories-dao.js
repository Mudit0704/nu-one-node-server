import foodCategoriesModel from './food-categories-model.js';

export const findFoodCategories = (category) => foodCategoriesModel.find({category: category});