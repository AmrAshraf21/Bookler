import axios from "axios";
const axiosInter = axios.create({
	baseURL: "http://localhost:3000/",
});

export default axiosInter;
