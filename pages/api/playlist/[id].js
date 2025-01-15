import { axiosClient, getUserAccessData } from "../../../src/utils/axios";
import * as cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const playlist_id = req.query.id;
      if (
        playlist_id === "" ||
        playlist_id === undefined ||
        playlist_id.length < 1
      ) {
        return res.status(401).json({
          message: "Invalid playlist",
          code: 401,
          success: false,
        });
      }
      const { refresh_token } = cookie.parse(req.headers.cookie);

      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);

      const { data } = await axiosClient().get(`/playlists/${playlist_id}`, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });

      res.status(200).json({
        message: "Playlist details",
        data: data,
        success: true,
        code: 200,
      });
    } catch (error) {
      console.log(error.response);
      res.send("errror");
    }
  }
}
