import { useState } from "react";
import Select from "./Select";
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
    const index = selectedArtistsIds.findIndex((trackID) => trackID === id);
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
        seed_artists: selectedArtistsIds.join(","),
        seed_tracks: "",
        seed_genres: "",
      });
      setRecommendedTracks(data.data);
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

  const handleGeneratePlaylistFromRecommendedTracks = async () => {
    try {
      const data = await axios.post("/api/playlists/");
      console.log(data);
    } catch (error) {}
  };

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
          handleContinue={handleGeneratePlaylistFromRecommendedTracks}
          options={recommendedTracks}
          heading={"Remove tracks you do not want by clicking them..."}
        />
      );
    }
  }
};

export default Tap;
