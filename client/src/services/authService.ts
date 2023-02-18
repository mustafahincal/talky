import axios from "axios";
import { RegisterRequest, LoginRequest } from "../types/auth";
import { post } from "./request";

const url: string = process.env.REACT_APP_BASE_ENDPOINT + "/user";

export const fetchRegister = (userForRegister: RegisterRequest) =>
  post(url, userForRegister);

export const fetchLogin = (userForLogin: LoginRequest) =>
  post(url + "/login", userForLogin);
