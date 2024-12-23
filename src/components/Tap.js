import { useState } from "react";
import Select from "./Select";
import InputPlaylist from "./InputPlaylist";
import axios from "axios";
import SelectRecommendedTracks from "./SelectRecommendedTracks";
import Loading from "./Loading";
import { useRouter } from "next/router";

const Tap = ({ artists }) => {
  const router = useRouter();

  const [tap, setTap] = useState(1);
  const [selectedArtistsIds, setSelectedArtistsIds] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  //Loading state
  const [loading, setLoading] = useState(false);

  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };
  const handleSelectArtists = (id) => {
    const index = selectedArtistsIds.findIndex((trackID) => trackID === id);
    if (index === -1) {
      //   if (selectedArtistsIds.length >= 5) return;
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
      console.log(selectedArtistsIds);
      if (selectedArtistsIds.length < 1) {
        alert("Select at least one artist");
        setLoading(false);
        return;
      }
      const { data } = await axios.post("/api/generate", {
        seed_artists: selectedArtistsIds.join(","),
        seed_tracks: "",
        seed_genres: "",
      });
      setRecommendedTracks(data.data);
      setTap(2);
    } catch (error) {
      setRecommendedTracks([]);
    }
    setLoading(false);
  };

  const handleNextTap = () => {
    if (!playlistName || playlistName.length < 5) {
      //Todo: handle the error by informing the user
      return;
    }
    setTap(3);
  };

  const removeUnwantedTracks = (id) => {
    if (recommendedTracks.length < 5) return;
    setRecommendedTracks((prevRecommendedTracks) => {
      return prevRecommendedTracks.filter((track) => track.id !== id);
    });
  };

  const handleGeneratePlaylistFromRecommendedTracks = async () => {
    setLoading(true);
    try {
      const tracksURIs = recommendedTracks.map((track) => track.uri);
      const { status } = await axios.post("/api/playlists/", {
        tracks: tracksURIs,
        name: playlistName,
      });
      if (status === 200) {
        router.push("/playlists");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const artistsAsArray = artists?.map((art) => {
    return {
      id: art.id,
      name: art.name,
      url: art?.images[0].url,
    };
  });

  if (loading) {
    return <Loading />;
  }

  switch (tap) {
    case 1: {
      return (
        <Select
          options={artistsAsArray}
          heading={"Select 5 artists you want in the playlist"}
          handleAdd={handleSelectArtists}
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
