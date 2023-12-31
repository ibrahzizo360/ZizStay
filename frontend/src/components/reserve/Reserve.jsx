import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { addBooking } from "../../utils/booking";
import { updateRoomAvailability } from "../../utils/room";
import { toast } from "react-toastify";
import { sendNotification } from "../../utils/notification";

const Reserve = ({ setOpen, hotelId, amount }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, error } = useFetch(`https://zizstay-server.onrender.com/api/hotels/rooms/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const unavailableTimestamps = roomNumber.unavailableDates.map((date) =>
    new Date(date).getTime()
    );

    const selectedCheckInTimestamp = new Date(dates[0].startDate).getTime();
    const selectedCheckOutTimestamp = new Date(dates[0].endDate).getTime();

    const isFound = unavailableTimestamps.some((timestamp) =>
      timestamp >= selectedCheckInTimestamp && timestamp <= selectedCheckOutTimestamp
    );

    return !isFound;
  };
  
  

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };  

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setLoading(true);
      toast.promise(
        (async () => {
          await Promise.all(
            selectedRooms.map((roomId) => {
              const res = updateRoomAvailability(roomId,{dates: alldates});
              return res.data
            })
          );

          const newBooking = {
            userId,
            checkInDate: Date.now(),
            checkOutDate: Date.now(),
            amount,
          }

          const notification = {
            title: "New Booking",
            message: `You have a new booking from ${user.username}`
          }

          try {
            await sendNotification(notification);
            await addBooking(userId, newBooking);
            setOpen(false);
            navigate("/");
          } catch (error) {
            throw error;
          }
        })(),
        {
          pending: "Booking rooms...",
          success: "Hotel booked successfully",
          error: "Failed to book hotel",
        },
        {
          toastId: "bookHotel",
          position: "top-center",
        }
        )
        
      } catch (err) {console.log(err)}
    };
    return (
      <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <b>{roomNumber.number}</b>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} disabled={loading} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;