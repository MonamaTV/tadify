import { axiosClient, getUserAccessData } from "../../src/utils/axios";
import * as cookie from "cookie";
import prisma from "../../src/utils/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { refresh_token } = cookie.parse(req.headers.cookie);
      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);

      const { data: user } = await axiosClient().get("/me", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "Failed to get user",
          code: 401,
          success: false,
        });
      }

      res.status(200).json({
        data: user,
        code: 200,
        success: true,
        message: "User details",
      });
    } catch (error) {
      return res.status(401).json({
        message: "Failed to get user",
        code: 401,
        success: false,
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const { refresh_token } = cookie.parse(req.headers.cookie);
      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);

      res.status(200).json({
        code: 200,
        success: true,
        message: "Details updated",
      });
    } catch (error) {
      return res.status(401).json({
        message: "Failed to get user",
        code: 401,
        success: false,
      });
    }
  }
}
