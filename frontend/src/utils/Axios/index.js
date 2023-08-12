import axios from "axios"

const Axios = axios.create({
    baseURL: "https://zizstay-server.onrender.com/api/",
})

export default Axios