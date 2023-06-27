
import User from "../models/user.js"

export const deleteUser = async (req, res) => {

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted")
    }catch (error){
        res.status(500).json(error)
    }
}


export const getUserById = async (req, res) => {

    try {
        const foundUser = await User.findById(req.params.id)
        res.status(200).json(foundUser)
    }catch (error){
        res.status(500).json(error)
    }
}

export const getAllUsers = async (req, res) => {

    try {
        const users = await User.find()
        res.status(200).json(users)
    }catch (error){
        res.status(500).json(error)
    }
}


export const updateUser = async (req, res, next) => {

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id , { $set: req.body}, {new: true})
        res.status(200).json(updateUser)
    }catch (error){
        next(error)
    }
}
