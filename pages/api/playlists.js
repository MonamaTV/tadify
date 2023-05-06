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
        message: "Playlists",
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
      const { name, tracks } = req.body;
      const user = await getUsersDetails(access_token);
      const playlist = await createPlaylist(
        access_token,
        name,
        tracks,
        user.id
      );
      res.json({
        message: "Playlist created successfully",
        code: 200,
        success: true,
        data: playlist,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Failed to create playlist",
        success: false,
        code: 400,
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const { refresh_token } = cookie.parse(req.headers.cookie);
      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);
      const { playlistId, uris } = req.body;
      const { data } = await axiosClient().put(
        `/playlists/${playlistId}/tracks?uris=${uris}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      );
      res.status(200).json({
        message: "Updated playlist",
        success: true,
        code: 200,
        data,
      });
    } catch (error) {
      console.log(error.response);
      res.status(401).json({
        message: "Failed to update your playlist",
        success: false,
        code: 401,
      });
    }
  }
}

export const getUsersDetails = async (access_token) => {
  const { data } = await axiosClient().get("/me/", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  return data;
};

export const createPlaylist = async (access_token, name, tracks, userID) => {
  const { data: playlist } = await axiosClient().post(
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

  const { data } = await axiosClient().post(
    `/playlists/${playlist?.id}/tracks`,
    {
      uris: tracks,
    },
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );

  return data;
};
