import { SendMessageRequest } from "../types/message";
import { get, post } from "./request";

const url = process.env.REACT_APP_BASE_ENDPOINT + "/message";

export const fetchAllMessagesByChatId = (chatId: string) =>
  get(url + "/" + chatId);

export const fetchSendMessage = (data: SendMessageRequest) => post(url, data);
