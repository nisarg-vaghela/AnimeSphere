import axios from "axios";
import auth from "./authService";
import { toast } from "react-toastify";

//axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occured.");
  }

  return Promise.reject(error);
});
axios.defaults.headers.post['Content-Type'] ='application/json';

export function setJWT(jwt) {
  axios.defaults.headers.common["x-auth-token"] = auth.getJWT(jwt);
}

const exportVar = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWT,
};

export default exportVar;
