import { axiosClient, getUserAccessData } from "../../src/utils/axios";
import * as cookie from "cookie";
import { createPlaylist, getUsersDetails } from "./playlists";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { refresh_token } = cookie.parse(req.headers.cookie);
      const {
        data: { access_token },
      } = await getUserAccessData(refresh_token);

      //Artists whose tracks will be added to the playlist
      const artistIDs = req.body.artistsIDs.split(",");
      //Name and length of the playlist
      const { length, name } = req.body;
      const { country, id: userID } = await getUsersDetails(access_token);
      const promises = getArtistsTopTracks(artistIDs, country, access_token);
      //Promises
      const promiseRes = await Promise.allSettled(promises);
      //Calculate the total number of tracks to be added to the track list
      const slicer = parseInt(length) / artistIDs.length;

      const results = promiseRes.map((res) => {
        if (res.status === "fulfilled") {
          return res.value.data.tracks.slice(0, slicer);
        }
      });

      //Flatten the results array
      const tracksURIs = [];
      results.forEach((track) => {
        track.forEach((detail) => {
          tracksURIs.push(detail.uri);
        });
      });

      //Create the playlist
      const res = await createPlaylist(
        access_token,
        name,
        tracksURIs,
        userID,
        access_token
      );

      res.status(200).json({
        data: res,
        message: "tracks",
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(200).json({
        message: "Failed to get the tracks",
        success: false,
      });
    }
  }
}

const getArtistsTopTracks = (artistsIDs, country, access_token) => {
  if (artistsIDs.length === 0) return;

  const promises = artistsIDs.map((artistID) => {
    return axiosClient().get(`/artists/${artistID}/top-tracks`, {
      params: {
        market: country,
      },
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
  });

  return promises;
};
