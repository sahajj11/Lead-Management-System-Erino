import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"https://lead-management-system-erino.onrender.com",
    withCredentials: true,

})

export default axiosInstance