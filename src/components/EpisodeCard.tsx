import React from "react";
import type { Episode } from "../types";

interface Props {
  episode: Episode;
}

const EpisodeCard: React.FC<Props> = ({ episode }) => {
  return (
    <div className="card">
      <h3>{episode.name}</h3>
      <p>Air Date: {episode.air_date}</p>
      <p>Episode Code: {episode.episode}</p>
      <p>Characters: {episode.characters.length}</p>
    </div>
  );
};

export default EpisodeCard;