import { axiosClient } from "../../src/utils/axios";
import { getUserAccessData } from "../../src/utils/axios";
import * as cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { refresh_token } = req.query;
      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);

      //Get time_range

      const ranges = ["long_term", "short_term", "medium_term"];
      const range = ranges.includes(req.query?.range)
        ? req.query.range
        : "short_term";

      const { data, status } = await axiosClient().get("/me/top/tracks", {
        params: {
          limit: 40,
          time_range: range,
        },
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });

      if (status !== 200) {
        return res.status(status).json({
          message: "Failed to authenticate user",
          success: false,
          code: status,
        });
      }

      res.json({
        message: "Top tracks",
        code: status,
        success: true,
        data,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to authenticate user",
        success: false,
        code: 400,
      });
    }
  }
}
