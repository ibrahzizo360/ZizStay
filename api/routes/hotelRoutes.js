import express from 'express';
import  {addHotel, getAllHotels, deleteHotel, getHotelById ,updateHotel, countByCity, countByType, getHotelRooms, getHotelsCount, getHotelCities}  from '../controllers/hotelController.js';
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

router.get("/get/hotel-cities", getHotelCities);


//GET ALL
router.get("/", getAllHotels);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/rooms/:id", getHotelRooms);

router.get("/count", getHotelsCount);

export default router