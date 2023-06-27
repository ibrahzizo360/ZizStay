import Hotel from '../models/hotel.js'


export const addHotel = async (req, res) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch (error){
        res.status(500).json(error)
    }
}

export const updateHotel = async (req, res) => {

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id , { $set: req.body}, {new: true})
        res.status(200).json(updateHotel)
    }catch (error){
        res.status(500).json(error)
    }
}

export const deleteHotel = async (req, res) => {

    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("deletedHotel")
    }catch (error){
        res.status(500).json(error)
    }
}


export const getHotelById = async (req, res) => {

    try {
        const foundHotel = await Hotel.findById(req.params.id)
        res.status(200).json(foundHotel)
    }catch (error){
        res.status(500).json(error)
    }
}

export const getAllHotels = async (req, res) => {

    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    }catch (error){
        res.status(500).json(error)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');
    try {
      const counts = await Promise.all(
        cities.map((city) => Hotel.countDocuments({ city: city }))
      );
      res.status(200).json(counts);
    } catch (err) {
      next(err);
    }
  };

export const countByType = async(req, res) => {
    const types = req.query.cities.split(',')
    try {
        const list = Promise.all(types.map(type=>{
            return Hotel.countDocuments({type:type})
        }))
        return list
        
    } catch (err){
        next(err)
    }
}
