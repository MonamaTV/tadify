import { axiosClient } from "../../src/utils/axios";
import { getUserAccessData } from "../../src/utils/axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { refresh_token } = req.query;

      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);

      //Get time_range

      const { data, status } = await axiosClient().get(
        "/me/player/recently-played",
        {
          params: {
            limit: 10,
          },
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      );

      if (status !== 200) {
        return res.status(status).json({
          message: "Failed to authenticate user",
          success: false,
          code: status,
        });
      }

      res.json({
        message: "Recently plays",
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
