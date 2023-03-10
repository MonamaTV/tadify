import { useState } from "react";
import InputPlaylist from "./InputPlaylist";
import Loading from "./Loading";
import axios from "axios";
import SelectSuggestedArtists from "./SelectSuggestedArtists";
import PromptInput from "./PromptInput";
import PlaylistForm from "./PlaylistForm";
import { useRouter } from "next/router";
const Suggestions = () => {
  const [tap, setTap] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [suggestedArtists, setSuggestedArtists] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [playlistInfo, setPlaylistInfo] = useState({
    name: "",
    length: "",
  });

  const handlePlaylistInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPlaylistInfo({
      ...playlistInfo,
      [name]: value,
    });
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      if (prompt.length < 5) {
        return;
      }
      const { data } = await axios.get("/api/generate", {
        params: {
          prompt,
        },
        //the request takes time because it hits the server, then the server sends a request to ChatGPT and the Spotify Web API.
        // timeout: 10000,
      });

      // //very tedious
      const suggested = data.artists.map((item) => {
        const { artists } = item;
        if (artists) {
          return {
            name: artists.items[0].name,
            id: artists.items[0].id,
            url: artists.items[0].images[0].url,
          };
        }
      });
      setSuggestedArtists(suggested);
      setTap((prev) => prev + 1);
    } catch (error) {
      setSuggestedArtists([]);
    }
    setLoading(false);
  };

  const removeUnwantedArtists = (id) => {
    if (suggestedArtists.length < 5) return;
    setSuggestedArtists((prevSuggestedArtists) => {
      return prevSuggestedArtists.filter((artist) => artist.id !== id);
    });
  };

  const handleGeneratePlaylistBasedOnDesc = async () => {
    setLoading(true);
    try {
      const artistsIDs = suggestedArtists.map((art) => art.id).join(",");
      const response = await axios.post("/api/playlistgpt", {
        artistsIDs,
        length: playlistInfo.length,
        name: playlistInfo.name,
      });

      if (response.status === 200) {
        router.push("/playlists");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  switch (tap) {
    case 1: {
      return (
        <PromptInput
          value={prompt}
          handleChange={handlePrompt}
          handleContinue={fetchSuggestions}
        />
      );
    }
    case 2: {
      return (
        <PlaylistForm
          handleChange={handlePlaylistInfo}
          handleContinue={() => {
            setTap((prev) => prev + 1);
          }}
        />
      );
    }

    case 3: {
      return (
        <SelectSuggestedArtists
          options={suggestedArtists}
          handleAdd={removeUnwantedArtists}
          handleContinue={handleGeneratePlaylistBasedOnDesc}
        />
      );
    }
  }
};

export default Suggestions;
