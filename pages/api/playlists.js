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

      const { data, status } = await axiosClient().get("/me/playlists", {
        params: {
          limit: 30,
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

  if (req.method == "POST") {
    try {
      const { refresh_token } = cookie.parse(req.headers.cookie);
      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);
      const { name } = req.body;
      const user = await getUsersDetails(access_token);
      const playlist = await createPlaylist(access_token, name, user.id);
      res.json(playlist);
    } catch (err) {
      console.log(err);
    }
  }
}

const getUsersDetails = async (access_token) => {
  const { data } = await axiosClient().get("/me/", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  return data;
};

const createPlaylist = async (access_token, name, userID) => {
  const { data } = await axiosClient().post(
    `/users/${userID}/playlists`,
    {
      name,
      public: false,
    },
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  return data;
};
