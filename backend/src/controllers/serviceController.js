import Service from "../models/Service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createService = async (req, res, next) => {
  try {
    const service = await Service.create({
      ...req.body,
      provider: req.user._id
    });

    successResponse(res, 201, "Service created", service);
  } catch (error) {
    next(error);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isAvailable: true })
      .populate("category", "name")
      .populate("provider", "name email");

    successResponse(res, 200, "Services fetched", services);
  } catch (error) {
    next(error);
  }
};

export const getServiceByCategory = async (req, res, next) => {
  try {
    const services = await Service.find({
      category: req.params.categoryId,
      isAvailable: true
    });

    successResponse(res, 200, "Services fetched by category", services);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, provider: req.user._id },
      req.body,
      { new: true }
    );

    successResponse(res, 200, "Service updated", service);
  } catch (error) {
    next(error);
  }
};
