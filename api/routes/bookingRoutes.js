import express from "express";
import { bookHotelRooms, getBookings } from "../controllers/bookingController.js";
import { verifyAdmin, authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:id", authenticateUser, verifyAdmin, bookHotelRooms);

router.get('/', authenticateUser, verifyAdmin, getBookings);


export default router;