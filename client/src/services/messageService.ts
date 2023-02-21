import { get, post } from "./request";

const url = process.env.REACT_APP_BASE_ENDPOINT + "/message";

export const fetchAllMessagesByChatId = (chatId: string) =>
  get(url + "/" + chatId);
