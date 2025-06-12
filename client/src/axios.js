import axios from "axios";

const basicUrl = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://course-project-back-tv8f.onrender.com'
        : 'http://localhost:5050'
});

export default basicUrl;