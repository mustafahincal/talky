import { get } from "./request";

const url = process.env.REACT_APP_BASE_ENDPOINT + "/user";

export const fetchAllUsers = () => get(url);
