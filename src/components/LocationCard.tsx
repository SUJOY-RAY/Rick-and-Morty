import React from "react";
import type { Location } from "../types";

interface Props {
  location: Location;
}

const LocationCard: React.FC<Props> = ({ location }) => {
  return (
    <div className="card">
      <h3>{location.name}</h3>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
      <p>Residents: {location.residents.length}</p>
    </div>
  );
};

export default LocationCard;