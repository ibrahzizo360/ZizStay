import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import hotelRoutes from './routes/hotelRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser())


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


app.use('/api/hotel', hotelRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use("/api/room", roomRoutes);


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

app.listen(5000, () => {
    console.log("Server connected successfully")
})


