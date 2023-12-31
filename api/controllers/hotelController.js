import Hotel from '../models/hotel.js'
import Room from '../models/room.js'

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

export const getAllHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gte: min || 1, $lte: max || 9999 },
      }).limit(parseInt(limit));
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };

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

  export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
      const resortCount = await Hotel.countDocuments({ type: "Resort" });
      const villaCount = await Hotel.countDocuments({ type: "Villa" });
      const guestHouseCount = await Hotel.countDocuments({ type: "Guest house" });
  
      res.status(200).json([
        { type: "hotels", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "guest houses", count: guestHouseCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };

export const getHotelsCount = async (req, res, next) => {
    try{
        const count = await Hotel.countDocuments()
        res.status(200).json({"count": count})
    }catch(err){
        next(err)
    }
}  

export const getHotelCities = async (req, res, next) => {
  try {
    const { searchCity } = req.query;

    let query = {};

    if (searchCity) {
      query = {
        city: { $regex: new RegExp(searchCity, 'i') } // Case-insensitive search
      };
    }

    const distinctCities = await Hotel.distinct('city', query);

    res.json({ hotelCities: distinctCities });
  } catch (err) {
    next(err);
  }
};





