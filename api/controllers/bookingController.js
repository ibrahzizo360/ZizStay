import Room from "../models/room.js";
import User from "../models/user.js";
import Booking from "../models/booking.js";

export const bookHotelRooms = async (req, res, next) => {
  const userId = req.params.id;
  const newBooking = new Booking(req.body);
  const { amount } = newBooking;
  const admin = await User.findById("64c833551953606c91a4bf2d");

  try {
      const savedBooking = await newBooking.save();


      const user = await User.findById(userId);
      user.bookings.push(savedBooking._id);
      await user.save();

      if (admin) {
          admin.balance += amount;
          await admin.save();
      }

      res.status(200).json({ message: "hotel booked successfully" });
  } catch (err) {
      next(err);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .sort({ checkOutDate: -1 })
      .limit(5)
      .populate('userId', 'username'); // Populate userId with 'username' field

    res.status(200).send(bookings);
  } catch (err) {
    next(err);
  }
};
  
export const getBookingsById = async(req,res,next) => {
  try {
    const userId = req.params.id;
    const bookings = await Booking.findById(userId);

    res.status(200).json(bookings);
  }
  catch (err){
    next(err)
  }
}

export const getPastWeekBookings = async(req,res,next) => {

  try {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7); // Subtract 7 days

    const bookings = await Booking.aggregate([
      {
        $match: {
          checkOutDate: { $gte: lastWeek },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$checkOutDate' }, // Group by day of the week
          totalAmount: { $sum: '$amount' }, // Calculate total amount for each day
        },
      },
      {
        $project: {
          _id: 0,
          dayOfWeek: '$_id',
          totalAmount: 1,
        },
      },
    ]);
    res.status(200).json(bookings);
  
}catch(err){
  next(err)
}
}

export const getTotalRevenue = async (req, res, next) => {
  try {
    const admin = await User.findById("64c833551953606c91a4bf2d");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ balance: admin.balance });
  } catch (err) {
    next(err);
  }
};

export const getTodayRevenue = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the beginning of the next day

    const bookings = await Booking.aggregate([
      {
        $match: {
          checkOutDate: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount", // Assuming you have a "totalAmount" field in your Booking schema
          },
        },
      },
    ]);

    // If there are no bookings for today, return 0 revenue
    const totalRevenue = bookings.length > 0 ? bookings[0].totalRevenue : 0;

    res.status(200).json({ amount: totalRevenue });
  } catch (err) {
    next(err);
  }
};