import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CharacterCard from "./components/CharactedCard"; 
import LocationCard from "./components/LocationCard";
import EpisodeCard from "./components/EpisodeCard";

import "./App.css";
import { fetchCharacters, fetchEpisodes, fetchLocations } from "./api";

type Tab = "characters" | "locations" | "episodes";

const App = () => {
  const [tab, setTab] = useState<Tab>("characters");
  const [page, setPage] = useState(1);

  const characterQuery = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
    enabled: tab === "characters",
    staleTime: 1000 * 60 * 2
  });

  const locationQuery = useQuery({
    queryKey: ["locations", page],
    queryFn: () => fetchLocations(page),
    enabled: tab === "locations",
    staleTime: 1000 * 60 * 2
  });

  const episodeQuery = useQuery({
    queryKey: ["episodes", page],
    queryFn: () => fetchEpisodes(page),
    enabled: tab === "episodes",
    staleTime: 1000 * 60 * 2
  });

  const currentQuery =
    tab === "characters"
      ? characterQuery
      : tab === "locations"
      ? locationQuery
      : episodeQuery;

  const totalPages = currentQuery.data?.info.pages ?? 1;

  return (
    <div className="container">
      <h1>Rick and Morty API</h1>

      {/* Tabs */}
      <div className="tabs">
        <button onClick={() => { setTab("characters"); setPage(1); }}>
          Characters
        </button>
        <button onClick={() => { setTab("locations"); setPage(1); }}>
          Locations
        </button>
        <button onClick={() => { setTab("episodes"); setPage(1); }}>
          Episodes
        </button>
      </div>

      {/* Loading */}
      {currentQuery.isLoading && <p>Loading...</p>}

      {/* Error */}
      {currentQuery.isError && <p>Something went wrong</p>}

      {/* Data */}
      {!currentQuery.isLoading && !currentQuery.isError && (
        <div className="grid">
          {tab === "characters" &&
            characterQuery.data?.results.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}

          {tab === "locations" &&
            locationQuery.data?.results.map((l) => (
              <LocationCard key={l.id} location={l} />
            ))}

          {tab === "episodes" &&
            episodeQuery.data?.results.map((e) => (
              <EpisodeCard key={e.id} episode={e} />
            ))}

          {/* Empty state */}
          {currentQuery.data?.results.length === 0 && (
            <p>No results found</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() =>
            setPage((p) => (p < totalPages ? p + 1 : p))
          }
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;