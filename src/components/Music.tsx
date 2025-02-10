// Import necessary libraries
import React, { useState, useEffect } from "react";
import "../index.css"; // Add Tailwind CSS for styling

type Song = {
  country: string;
  trackIdentifier: string;
  mediaType: string;
  datePlayed: string;
  hours: number;
  playDurationMilliseconds: number;
  endReasonType: string;
  sourceType: string;
  playCount: number;
  skipCount: number;
  ignoreForRecommendations: boolean;
  trackReference: number;
  trackDescription: string;
};

const Music: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    // Fetch the JSON data
    fetch("../lib/songs.json") // Replace with actual path
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.trackDescription.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Music Play History</h1>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search by song or artist..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {/* Song List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSongs.map((song) => (
          <div
            key={song.trackIdentifier + song.datePlayed}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="font-bold text-lg">{song.trackDescription}</h2>
            <p className="text-sm text-gray-600">
              Played on: {song.datePlayed}
            </p>
            <p className="text-sm text-gray-600">
              Duration: {Math.round(song.playDurationMilliseconds / 1000)}{" "}
              seconds
            </p>
            <p className="text-sm text-gray-600">Source: {song.sourceType}</p>
            <p className="text-sm text-gray-600">
              Play Count: {song.playCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
