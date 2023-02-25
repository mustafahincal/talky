import { get, post } from "./request";

const url = process.env.REACT_APP_BASE_ENDPOINT + "/chat";

export const fetchAllChats = () => get(url);
export const fetchAccessChats = (userId: string) => post(url, { userId });
