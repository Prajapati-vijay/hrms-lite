import axios from "axios";

const API = axios.create({
  baseURL: "https://vijay286.pythonanywhere.com/api/",
});

export default API;
