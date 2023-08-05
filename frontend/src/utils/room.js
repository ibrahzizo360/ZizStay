import Axios from "./Axios";
import { toast } from "react-toastify"

export const updateRoomAvailability = async (roomId , info, token, callback) => {
    try {
        const {data} = await Axios({
            url: `rooms/availability/${roomId}`,
            method: "PUT",
            data: info,
            headers: {Authorization: `Bearer ${token}`}
        });
        callback(data);
    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "updateRoom",
            }
        );
    }
}