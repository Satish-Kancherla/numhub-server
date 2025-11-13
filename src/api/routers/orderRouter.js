import { Router } from "express";
import { OrderController } from "../controllers/orderController.js";

export const orderRouter = Router();
orderRouter.post("/",OrderController.createOrder);
orderRouter.get("/", OrderController.getOrders);
orderRouter.put("/:id", OrderController.updateOrder);

orderRouter.get("/statuses", OrderController.getOrderStatuses);