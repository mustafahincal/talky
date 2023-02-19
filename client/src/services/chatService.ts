import { get, post } from "./request";

const url = process.env.REACT_APP_BASE_ENDPOINT + "/chat";

export const fetchAllChats = () => get(url);
export const fetchAccessChats = (userId: number) => post(url, { userId });
export const fetchAllMessagesByChatId = (chatId: number) =>
  get(url + "/" + chatId);
