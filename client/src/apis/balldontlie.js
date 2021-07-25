import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.balldontlie.io/api/v1",
});

export default instance;
