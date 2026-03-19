import React, { useEffect, useState } from "react";

import LocationCard from "./components/LocationCard";
import EpisodeCard from "./components/EpisodeCard";
import "./App.css";
import type { Character, Episode } from "./types";
import { fetchCharacters, fetchEpisodes, fetchLocations } from "./api";
import CharacterCard from "./components/CharactedCard";

type Tab = "characters" | "locations" | "episodes";

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>("characters");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState<number>(1);
  const [infoPages, setInfoPages] = useState<number>(1);

  const loadData = async () => {
    try {
      if (tab === "characters") {
        const data = await fetchCharacters(page);
        setCharacters(data.results);
        setInfoPages(data.info.pages);
      } else if (tab === "locations") {
        const data = await fetchLocations(page);
        setLocations(data.results);
        setInfoPages(data.info.pages);
      } else if (tab === "episodes") {
        const data = await fetchEpisodes(page);
        setEpisodes(data.results);
        setInfoPages(data.info.pages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [tab, page]);

  return (
    <div className="container">
      <h1>Rick and Morty API</h1>
      <div className="tabs">
        <button onClick={() => setTab("characters")}>Characters</button>
        <button onClick={() => setTab("locations")}>Locations</button>
        <button onClick={() => setTab("episodes")}>Episodes</button>
      </div>

      <div className="grid">
        {tab === "characters" && characters.map((c) => <CharacterCard key={c.id} character={c} />)}
        {tab === "locations" && locations.map((l) => <LocationCard key={l.id} location={l} />)}
        {tab === "episodes" && episodes.map((e) => <EpisodeCard key={e.id} episode={e} />)}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {infoPages}
        </span>
        <button onClick={() => setPage((p) => (p < infoPages ? p + 1 : p))} disabled={page === infoPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;