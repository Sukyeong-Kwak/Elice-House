import { Router } from "express";
import { ProductController } from "../controllers/product-controller.js";

const productRouter = Router();

// 전체 상품 조회(admin)
productRouter.get("/admin/products", ProductController.getAllProducts);
// 상품 추가(admin)
productRouter.post("/admin/products", ProductController.createProduct);
// 상품 삭제(admin)
productRouter.delete(
  "/admin/products/:productId",
  ProductController.deleteProduct
);
// 상품 정보 카테고리별 조회(user)
productRouter.get("/products/:subcatId", ProductController.getProductsByCat);

// 상품 정보 상세 조회(user)
productRouter.get("/products/detail/:productId", ProductController.getProdById);

// 상품 수정
// productRouter.patch("/products/admin/products/:productId", ProductController.updateUser);

export { productRouter };
