import axios from "axios";

const secureAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/"
});

secureAxios.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer Token";
  return config;
});

secureAxios.interceptors.request.use(
  (response) => {
    console.log("Done with the server call");
    return response;
  },
  (error) => {
    console.log("Some error has occured");
    return Promise.reject(error);
  }
);

export default secureAxios;
