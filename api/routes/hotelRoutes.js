import express from 'express';
import  {addHotel, getAllHotels, deleteHotel, getHotelById ,updateHotel, countByCity, countByType, getHotelRooms}  from '../controllers/hotelController.js';
import { verifyAdmin, authenticateUser} from '../middlewares/authMiddleware.js';

const router = express.Router();

//CREATE
router.post("/", authenticateUser, verifyAdmin, addHotel);

//UPDATE
router.put("/:id", authenticateUser, verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", authenticateUser, verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotelById);

//GET ALL
router.get("/", getAllHotels);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/rooms/:id", getHotelRooms);

export default router