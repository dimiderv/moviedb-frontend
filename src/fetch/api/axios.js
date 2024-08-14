import axios from 'axios';



const BASE_URL = 'https://moviedb-backend-tz9d.onrender.com'
// 'http://localhost:80';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});