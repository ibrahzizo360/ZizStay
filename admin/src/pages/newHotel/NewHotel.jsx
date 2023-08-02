import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { addHotel } from "../../utils/hotel";
import { toast } from "react-toastify";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const token = localStorage.getItem("token")
  // const { data, loading, error } = useFetch("http://localhost:5000/api/rooms", token);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      await toast.promise(
        (async () => {
          const list = await Promise.all(
            Object.values(files).map(async (file) => {
              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "h_m_s_");
              const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/zizo-dev/image/upload",
                data
              );
  
              const { url } = uploadRes.data;
              return url;
            })
          );
  
          const newhotel = {
            ...info,
            photos: list,
          };
  
          await addHotel(newhotel, token);
        })(),
        {
          pending: "Adding hotel...",
          success: "Hotel added successfully",
          error: "Failed to add hotel",
        },
        {
          toastId: "addHotel",
          position: "top-center",
        }
      );
  
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
          </div>
          <div className="right">
            <form>
              

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              {/* <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div> */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;