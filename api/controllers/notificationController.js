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

export const deleteNotification = async (req, res, next) => {
    try {
        const notificationId = req.params.id; 

        await Notification.findByIdAndRemove(notificationId);

        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (err) {

        next(err);
    }
};

