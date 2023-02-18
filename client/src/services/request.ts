import axios from "axios";

function requestGet(url: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

function requestPost(url: string, data: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}

export const get = (url: string) => requestGet(url);
export const post = (url: string, data: any) => requestPost(url, data);
