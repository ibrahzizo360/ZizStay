import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../middlewares/errorMiddleware.js';

export const addUser = async (req, res, next) => {
    
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash
        });
        await newUser.save();
        res.status(200).json({"message": "Registration successful"});
    }catch (error){
        next(error)
    }
}


export const login = async (req, res, next) => {
    try{ 
    const user = await User.findOne({username: req.body.username});
    if(!user) return next(createError(404, "user not found"));

    const isPassword = await bcrypt.compare(req.body.password, user.password)
    if(!isPassword) return next(createError(400, "invalid credentials"))

    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)

    const {password, isAdmin, ...otherDetails} = user._doc;

    res.status(200).json({ "details": {...otherDetails }, token, isAdmin});
    } catch(err){
        next(err)
    }

}