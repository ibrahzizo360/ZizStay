import express from "express";
import { bookHotelRooms, getBookings, getBookingsById ,getPastWeekBookings, getTotalRevenue} from "../controllers/bookingController.js";
import { verifyAdmin, authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:id", authenticateUser, verifyAdmin, bookHotelRooms);

router.get('/', authenticateUser, verifyAdmin, getBookings);

router.get('/:id', authenticateUser, verifyAdmin, getBookingsById);

router.get('/find/past-week',authenticateUser, verifyAdmin,getPastWeekBookings);

router.get('/get/total-revenue', authenticateUser, verifyAdmin, getTotalRevenue);


export default router;