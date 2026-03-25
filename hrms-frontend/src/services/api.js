import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-1-t72g.onrender.com/api/",
});

export default API;