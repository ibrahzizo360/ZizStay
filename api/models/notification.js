import mongoose, {Schema, model} from "mongoose";

const notificationSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Notification", notificationSchema);