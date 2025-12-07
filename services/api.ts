import axios from "axios";

const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "https://omniai-hub-backend.onrender.com";

export const api = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
});
