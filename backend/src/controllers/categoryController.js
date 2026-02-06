import Category from "../models/Category.js";
import { successResponse } from "../utils/apiResponse.js";

export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    successResponse(res, 201, "Category created", category);
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true });
    successResponse(res, 200, "Categories fetched", categories);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    successResponse(res, 200, "Category updated", category);
  } catch (error) {
    next(error);
  }
};
