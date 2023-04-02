import { axiosClient, axiosOPENAIClient } from "../../src/utils/axios";
import { getUserAccessData } from "../../src/utils/axios";
import * as cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { refresh_token } = cookie.parse(req.headers.cookie);
      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);

      //Get seed_artists, seed_tracks and seed_genres from the req.body
      const { seed_artists, seed_tracks, seed_genres } = req.body;

      const { data, status } = await axiosClient().get("/recommendations", {
        params: {
          seed_artists,
          seed_genres,
          seed_tracks,
          limit: 20,
        },
        headers: {
          Authorization: "Bearer " + access_token,
        },
        withCredentials: true,
      });

      if (status !== 200) {
        return res.status(status).json({
          message: "Failed to authenticate user",
          success: false,
          code: status,
        });
      }

      res.json({
        message: "Recommended tracks",
        code: status,
        success: true,
        data: data.tracks,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to generate tracks",
        success: false,
        code: 400,
      });
    }
  }

  if (req.method === "GET") {
    try {
      const { refresh_token } = cookie.parse(req.headers.cookie);
      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);

      //
      const prompt = req.query?.prompt;
      if (!prompt) {
        return res.status(400).json({
          message: "No prompt provided",
          success: false,
          code: 400,
        });
      }
      const response = await axiosOPENAIClient().post("/completions", {
        model: "text-davinci-003",
        prompt: `Return a list of 10 artists based on the following prompt. DO NOT NUMBER THE LIST. Separate the artists in the list by comma. Do not mention anything else in your response except for the list/names. Here is the prompt: ${prompt}`,
        temperature: 0.8,
        n: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
      });

      const results = response.data.choices[0].text;

      const resultsArray = results.trim().split(", ");

      //Build an array of promises for each item in the array
      const promises = resultsArray.map((item) => {
        return axiosClient().get("/search", {
          params: {
            q: item,
            type: "artist",
            limit: 1,
          },
          headers: {
            Authorization: "Bearer " + access_token,
          },
        });
      });

      //settle all the promises
      const promiseRes = await Promise.allSettled(promises);

      const artists = promiseRes.map((res) => {
        if (res.status === "fulfilled") {
          return res.value.data;
        }
      });

      res.status(200).json({
        message: "Suggested artists",
        success: true,
        code: 200,
        results,
        artists,
      });
    } catch (error) {
      console.log(error.data);
      res.status(400).json({
        message: "Failed to generate artists list",
        success: false,
        code: 400,
      });
    }
  }
}
