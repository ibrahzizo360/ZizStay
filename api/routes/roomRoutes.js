import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
  getRoomsCount,
} from "../controllers/roomController.js";
import { verifyAdmin, authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

//CREATE
router.post("/:hotelid", authenticateUser, verifyAdmin, createRoom);

//UPDATE
router.put("/:id", authenticateUser, verifyAdmin, updateRoom);
router.put("/availability/:id", authenticateUser, verifyAdmin, updateRoomAvailability)

//DELETE
router.delete("/:id/:hotelid",authenticateUser, verifyAdmin, deleteRoom);

//GET
router.get("/find/:id", authenticateUser, verifyAdmin, getRoom);

//GET ALL
router.get("/", authenticateUser, verifyAdmin, getRooms);

router.get("/count", authenticateUser, verifyAdmin, getRoomsCount)

export default router;