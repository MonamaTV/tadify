import { axiosClient } from "../../src/utils/axios";
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
        console.log("First", status);
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
      if (error.response) {
        //do something
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log("Request", error.request);
        //do something else
      } else if (error.message) {
        console.log("Message", error.message);
        //do something other than the other two
      }

      return res.status(400).json({
        message: error,
        success: false,
        code: 400,
      });
    }
  }
}
