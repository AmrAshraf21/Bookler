import axios from "axios";
const axiosInter = axios.create({
	baseURL: "https://bookler-db-production.up.railway.app/",
});

export default axiosInter;
