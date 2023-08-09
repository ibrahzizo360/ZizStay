import Axios from "./Axios";
import { toast } from "react-toastify"

const token = localStorage.getItem("token");
export const updateRoomAvailability = async (roomId , info) => {
    try {
        await Axios({
            url: `rooms/availability/${roomId}`,
            method: "PUT",
            data: info,
            headers: {Authorization: `Bearer ${token}`}
        })
    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "updateRoom",
            }
        );
    }
}