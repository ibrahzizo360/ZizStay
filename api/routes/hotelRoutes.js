import express from 'express';
import  {addHotel, getAllHotels, deleteHotel, getHotelById ,updateHotel, countByCity, countByType}  from '../controllers/hotelController.js';
import { verifyAdmin} from '../middlewares/authMiddleware.js';

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, addHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotelById);

//GET ALL
router.get("/", getAllHotels);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

export default router