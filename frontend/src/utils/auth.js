import Axios from "./Axios";
import { toast } from "react-toastify"

export const signup = async (info, callback) => {
    try {
        const { data } = await Axios({
            url: "auth/signup",
            method: "POST",
            data:info
        });

        callback(data.userInfo);

    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "signupToast",
            }
        );
    }
}
export const signin = async (credentials, callback) => {
    try {
        const { data } = await Axios({
            url: "auth/signin",
            method: "POST",
            data:credentials
        });
        localStorage.setItem("token", data.token)
        localStorage.setItem("userInfo", JSON.stringify(data.user))
        callback(data.user);
    } catch (e) {
        toast.error(
            e?.response?.data?.message || e?.message || "Check console for error",
            {
                toastId: "signupToast",
            }
        );
    }
}