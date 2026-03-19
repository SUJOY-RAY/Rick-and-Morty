import React from "react";
import type { Character } from "../types";


interface Props {
  character: Character;
}

const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <div className="card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
};

export default CharacterCard;