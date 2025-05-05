import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromApi } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const { searchTerm } = useParams();

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null); // Reset error state before fetching
    fetchFromApi(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        setVideos(data.items || []);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch search results. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography variant="h4" fontWeight={900} color="white" mb={3} ml={{ sm: "100px" }}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        {loading ? (
          <Typography variant="h6" color="gray">
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="h6" color="red">
            {error}
          </Typography>
        ) : videos.length === 0 ? (
          <Typography variant="h6" color="gray">
            No results found for "{searchTerm}".
          </Typography>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Box>
  );
};

export default SearchFeed;