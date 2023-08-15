import express from "express";
import { createNotification, getNotifications, deleteNotification } from "../controllers/notificationController.js";


const router = express.Router();

router.post("/", createNotification)

router.get("/", getNotifications)

router.get('/:id', deleteNotification)

export default router