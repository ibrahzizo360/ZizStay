import Notification from '../models/notification.js';

export const createNotification = async (req, res, next) => {
    
    try {
        const { title, message } = req.body;
        const newNotification = new Notification({ title, message });
        await newNotification.save();
        res.json(newNotification);   
    }catch (error){
        next(error)
    }
}


export const getNotifications = async (req, res, next) => {
    try{ 

        const notifications = await Notification.find().sort('-timestamp');
        res.json(notifications);
        
    } catch(err){
        next(err)
    }
}