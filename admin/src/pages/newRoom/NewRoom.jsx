import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { roomInputs } from "../../data/formSource";
import useFetch from "../../hooks/useFetch";
import { addRoom } from "../../utils/room";
import { toast } from "react-toastify";


const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const { data, error } = useFetch("http://localhost:5000/api/hotels", token);

  if(error){toast.error("couldn't fetch hotels")}

  useEffect(() => {
    if (data && data.length > 0) {
      setHotelId(data[0]._id);
    }
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      setLoading(true);
      await toast.promise(
        (async () => {
          await addRoom({ ...info, roomNumbers }, token, hotelId);
        })(),
        {
          pending: "Adding room...",
          success: "Room added successfully",
          error: "Failed to add room",
        },
        {
          toastId: "addRoom",
          position: "top-center",
        }
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => { console.log(e.target.value); setHotelId(e.target.value); }}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Add Room</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;