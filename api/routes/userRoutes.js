import { getAllUsers, getUserById, deleteUser, updateUser} from "../controllers/userController.js";
import express from "express";
import { authenticateUser, verifyAdmin, verifyUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// UPDATE
router.put("/:id", authenticateUser, verifyUser, updateUser);

// DELETE
router.delete("/:id", authenticateUser, verifyUser, deleteUser);

// GET
router.get("/:id", authenticateUser, verifyUser, getUserById);

// GET ALL
router.get("/", authenticateUser, verifyAdmin, getAllUsers);

export default router;
