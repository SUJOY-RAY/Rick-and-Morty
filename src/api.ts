import axios from "axios";
import type { Character, CharacterResponse, Episode, EpisodeResponse, LocationResponse } from "./types";

const API_URL = "https://rickandmortyapi.com/api";


export const fetchCharacters = async (
  page = 1,
  filters?: Partial<{ name: string; status: string; species: string; type: string; gender: string }>
): Promise<CharacterResponse> => {
  const params = { page, ...filters };

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, String(value));
  });
  
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, "", newUrl); 
  
  const res = await axios.get<CharacterResponse>(`${API_URL}/character`, { params });
  
  return res.data;
};


export const fetchCharacterById = async (id: number | number[]): Promise<Character | Character[]> => {
  const res = await axios.get<Character | Character[]>(`${API_URL}/character/${id}`);
  return res.data;
};

// Locations
export const fetchLocations = async (
  page = 1,
  filters?: Partial<{ name: string; type: string; dimension: string }>
): Promise<LocationResponse> => {
  const params = { page, ...filters };
  const res = await axios.get<LocationResponse>(`${API_URL}/location`, { params });
  return res.data;
};

export const fetchLocationById = async (id: number | number[]): Promise<Location | Location[]> => {
  const res = await axios.get<Location | Location[]>(`${API_URL}/location/${id}`);
  return res.data;
};

// Episodes
export const fetchEpisodes = async (
  page = 1,
  filters?: Partial<{ name: string; episode: string }>
): Promise<EpisodeResponse> => {
  const params = { page, ...filters };
  const res = await axios.get<EpisodeResponse>(`${API_URL}/episode`, { params });
  return res.data;
};

export const fetchEpisodeById = async (id: number | number[]): Promise<Episode | Episode[]> => {
  const res = await axios.get<Episode | Episode[]>(`${API_URL}/episode/${id}`);
  return res.data;
};