import { getAllUsers, getUserById, deleteUser, updateUser} from "../controllers/userController.js";
import express from "express";

import {verifyAdmin, verifyUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUserById);

//GET ALL
router.get("/", verifyAdmin, getAllUsers);


export default router
