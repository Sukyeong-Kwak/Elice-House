import { Router } from "express";
import { OrderController } from "../controllers/order-controller.js";

const orderRouter = Router();

// 주문 추가
orderRouter.post("/orders", OrderController.createOrder);

// 전체 주문 조회
orderRouter.get("/orders/:userId", OrderController.getUserOrder);

// 주문 수정 (User)
orderRouter.patch("/orders/:orderId", OrderController.updateOrderByUser);

// 주문 수정 (Admin)
orderRouter.patch("/admin/orders/:orderId", OrderController.updateOrderByAdmin);

// 주문 취소 (User)
orderRouter.delete("/orders/:orderId", OrderController.deleteOrderByUser);

// 주문 삭제 (Admin)
orderRouter.delete(
  "/admin/orders/:orderId",
  OrderController.deleteOrderByAdmin
);

export { orderRouter };
