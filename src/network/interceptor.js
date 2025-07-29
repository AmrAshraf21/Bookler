import axios from "axios";

const axiosInter = axios.create({
	baseURL: import.meta.env.PROD ? "/api/" : "http://localhost:3000/",
});

export default axiosInter;
