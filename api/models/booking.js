import mongoose, {Schema, model} from "mongoose";

const BookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Booking", BookingSchema);