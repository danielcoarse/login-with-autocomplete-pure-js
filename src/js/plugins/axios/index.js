import axios from "axios";
import API_ENV from "../../config/api.config";
import interceptors from "./interceptors";

const instance = axios.create({
  baseURL: API_ENV.apiUrl, // Теперь запрос подставляется по умолчанию axios и нам не нужно импортировать каждый раз API_ENV
  headers: {
    "Content-Type": "application/json",
  },
});

interceptors(instance);

export default instance;