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
          limit: 20,
          seed_artists,
          seed_tracks,
          seed_genres,
        },
        headers: {
          Authorization: "Bearer " + access_token,
        },
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
      console.log("seconds", error);

      return res.status(400).json({
        message: "Failed to authenticate user",
        success: false,
        code: 400,
      });
    }
  }
}
