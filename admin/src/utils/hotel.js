import Axios from "./Axios";
import { toast } from "react-toastify"

export const addHotel = async (info ,token, callback) => {
    try {
        const { data } = await Axios({
            url: "hotels",
            method: "POST",
            data:info,
            headers: {Authorization: `Bearer ${token}`}
        });
        callback(data);
    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "addHotel",
            }
        );
    }
}