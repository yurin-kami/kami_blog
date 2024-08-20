import axios from "axios";

const instance = axios.create({
  baseURL: "http://172.16.21.103:5000/",
  timeout: 1000,
  headers: { "Content-Type": "application/json" }
});

export default instance;