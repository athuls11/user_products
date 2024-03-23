import express from "express";
import { userLogin, userRegister } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", userRegister);
router.post("/login", userLogin);

export default router;
