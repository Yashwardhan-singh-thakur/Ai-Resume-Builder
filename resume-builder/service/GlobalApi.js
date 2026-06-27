import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

function createNewResume(data) {
  return axiosClient.post("/user-resumes", { data: data });
}

function getUserResume(userEmail) {
  return axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);
}

export { createNewResume, getUserResume };
