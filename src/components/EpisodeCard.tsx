import React from "react";
import type { Episode } from "../types";

interface Props {
  episode: Episode;
}

const EpisodeCard: React.FC<Props> = ({ episode }) => {
  return (
    <div className="card">
      <h3 className="card-title">{episode.name}</h3>

      <p>
        <strong>Code:</strong> {episode.episode}
      </p>

      <p>
        <strong>Air Date:</strong> {episode.air_date || "Unknown"}
      </p>

      <p>
        <strong>Characters:</strong> {episode.characters?.length ?? 0}
      </p>
    </div>
  );
};

export default EpisodeCard;