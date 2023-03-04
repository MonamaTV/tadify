import { useState } from "react";
import { axiosClient, getUserAccessData } from "../utils/axios";
import Select from "./Select";
import * as cookie from "cookie";
import InputPlaylist from "./InputPlaylist";
import axios from "axios";
import SelectRecommendedTracks from "./SelectRecommendedTracks";

const Tap = ({ artists }) => {
  const [tap, setTap] = useState(1);
  const [selectedArtistsIds, setSelectedArtistsIds] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  //Loading state
  const [loading, setLoading] = useState(false);

  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };
  const handleArtistsInput = (id) => {
    const index = selectedArtistsIds.findIndex((a) => a.id === id);
    if (index === -1) {
      setSelectedArtistsIds((prevSelectedArtists) => {
        return [...prevSelectedArtists, id];
      });
    }
    if (index !== -1) {
      setSelectedArtistsIds((prevSelectedArtists) => {
        return prevSelectedArtists.filter((art) => art !== id);
      });
    }
  };

  const generateRecommendedTracks = async () => {
    setLoading(true);
    try {
      const { data, status } = await axios.post("/api/generate", {
        limit: 20,
        seed_artists: selectedArtistsIds.join(","),
        seed_tracks: "",
        seed_genres: "",
      });
      setRecommendedTracks(data.data);
      setLoading(false);
      setTap(2);
    } catch (error) {
      console.log(error);
      setRecommendedTracks([]);
    }
    setLoading(false);
  };

  const handleNextTap = () => {
    if (!playlistName || playlistName.length < 5) {
      return;
    }
    setTap(3);
  };

  const removeUnwantedTracks = (id) => {
    setRecommendedTracks((prevRecommendedTracks) => {
      return prevRecommendedTracks.filter((track) => track.id !== id);
    });
  };

  const handleGenerateRecommendedTracks = async () => {};

  const artistsAsArray = artists?.map((art) => {
    return {
      id: art.id,
      name: art.name,
      url: art?.images[0].url,
    };
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  switch (tap) {
    case 1: {
      return (
        <Select
          options={artistsAsArray}
          heading={"Select artists you want in the playlist"}
          handleAdd={handleArtistsInput}
          handleContinue={generateRecommendedTracks}
        />
      );
    }
    case 2: {
      return (
        <InputPlaylist
          value={playlistName}
          handleContinue={handleNextTap}
          handleChange={handlePlaylistNameChange}
        />
      );
    }
    case 3: {
      return (
        <SelectRecommendedTracks
          handleAdd={removeUnwantedTracks}
          options={recommendedTracks}
          heading={"Remove tracks you do not want by clicking them..."}
        />
      );
    }
  }
};

export default Tap;
