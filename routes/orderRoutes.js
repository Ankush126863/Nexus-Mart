import express from "express";
import {  requireSignIn } from "../middlewares/authMiddleware.js";
import { getUserOrdersController } from "../controllers/orderController.js";
const router = express.Router();

router.get(
  "/my-orders",
  requireSignIn,
  getUserOrdersController
);
export default router;
