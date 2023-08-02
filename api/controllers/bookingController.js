import Room from "../models/room.js";
import User from "../models/user.js";
import Booking from "../models/booking.js";

export const bookHotelRooms = async (req, res, next) => {
  
    const newBooking = new Booking(req.body);
    const {amount} = newBooking;
    const admin = await User.findById("64c833551953606c91a4bf2d"); 

    try {
      await newBooking.save();
      if (admin) {
        admin.balance += amount;
        await admin.save();
      }
      res.status(200).json({message: "hotel booked succesfully"});
    } catch (err) {
      next(err);
    }
};
  
export const getBookings = async (req, res, next) => {

    try {
    const bookings = await Booking.find();

    res.status(200).json(bookings);
    } catch (err) {
    next(err);
    }
};
  
