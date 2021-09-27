import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.ZOOM_BASE_URL,
  headers: {
    "Accept": "application/json",
    "User-Agent": "Zoom-api-Jwt-Request",
    "content-type": "application/json",
    "Authorization": `Bearer ${process.env.ZOOM_JWT_TOKEN}`
  },
});

export default axiosInstance;

