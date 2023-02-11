import axios from "axios";
import { scopes } from "./spotify";

const encodeBasicAuth = Buffer.from(
  process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
).toString("base64");

export const axiosAuthClient = () => {
  return axios.create({
    baseURL: process.env.AUTH_URL + "/authorize",
    params: {
      client_id: process.env.CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.REDIRECT_URI,
      scope: scopes,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const axiosAccessTokenClient = () => {
  return axios.create({
    baseURL: process.env.AUTH_URL + "/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + encodeBasicAuth,
    },
  });
};

export const axiosRefreshAccessTokenClient = () => {
  return axios.create({
    baseURL: process.env.AUTH_URL + "/api/token",
    params: {
      grant_type: "refresh_token",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + encodeBasicAuth,
    },
  });
};

export const axiosClient = () => {
  return axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getUserAccessData = async (refresh) => {
  return await axiosRefreshAccessTokenClient().post("/", {
    grant_type: "refresh_token",
    refresh_token: refresh,
    redirect_uri: process.env.REDIRECT_URI,
  });
};
