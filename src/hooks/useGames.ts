import { AxiosError, CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const getGames = async () => {
      try {
        const { data } = await apiClient.get<FetchGamesResponse>("/games", {
          signal: controller.signal,
        });
        setGames(data.results);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
      }
    };

    getGames();
    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
