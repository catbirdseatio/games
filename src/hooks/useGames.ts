import { AxiosError, CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getGames = async () => {
      setIsLoading(true);

      try {
        const { data } = await apiClient.get<FetchGamesResponse>("/games", {
          signal: controller.signal,
        });
        setGames(data.results);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
        setIsLoading(false);
      }
    };

    getGames();
    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
