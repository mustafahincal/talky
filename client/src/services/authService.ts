import axios from "axios";
import { Register, Login } from "../types/auth";

const url: string = process.env.REACT_APP_BASE_ENDPOINT + "/user";

export const fetchRegister = (userForRegister: Register) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, userForRegister)
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
};

export const fetchLogin = (userForLogin: Login) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + "/login", userForLogin)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
