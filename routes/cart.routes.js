import express from "express";
import verifyToken from "../middleware/auth.js";
import { addProducts, removeProduct } from "../controller/cart.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addProducts);
router.post("/remove", verifyToken, removeProduct);

export default router;
