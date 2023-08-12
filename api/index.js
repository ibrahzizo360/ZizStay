import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import hotelRoutes from './routes/hotelRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";


dotenv.config();
const app = express();
app.use(cors(
    {origin: ['http://localhost:3000',"http://localhost:3001","https://zizstay-admin.onrender.com/"]}
));
app.use(express.json());
app.use(cookieParser());


const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.DB_URL,{
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};


app.use('/api/hotels', hotelRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api/notifications', notificationRoutes)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

