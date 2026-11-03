
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

// Get all orders of logged-in user
export const getUserOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching user orders",
      error: error.message,
    });
  }

};
