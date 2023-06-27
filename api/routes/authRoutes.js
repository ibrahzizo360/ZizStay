import { addUser , login } from "../controllers/authController.js";
import express from "express";
const router = express.Router();

router.post("/register", addUser)

router.post("/login", login)

export default router


