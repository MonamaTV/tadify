import axios from "axios";
import { scopes } from "./spotify";

const encodeBasicAuth = Buffer.from(
  process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
).toString("base64");

export const axiosAuthClient = () => {
  const REDIRECT_URI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/home"
      : process.env.REDIRECT_URI;
  return axios.create({
    baseURL: process.env.AUTH_URL + "/authorize",
    params: {
      client_id: process.env.CLIENT_ID,
      response_type: "code",
      redirect_uri: REDIRECT_URI,
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
      "Content-Type": "application/json",
    },
  });
};

export const axioAPIClient = () => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : process.env.API_URL;
  return axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const axiosOPENAIClient = () => {
  return axios.create({
    baseURL: process.env.OPEN_AI_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPEN_AI_KEY,
    },
  });
};

export const getUserAccessData = async (refresh) => {
  const REDIRECT_URI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/home"
      : process.env.REDIRECT_URI;

  return await axiosRefreshAccessTokenClient().post("/", {
    grant_type: "refresh_token",
    refresh_token: refresh,
    redirect_uri: REDIRECT_URI,
  });
};
