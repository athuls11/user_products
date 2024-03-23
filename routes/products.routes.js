import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  createProduct,
  viewAllProducts,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/all", verifyToken, viewAllProducts);

export default router;
