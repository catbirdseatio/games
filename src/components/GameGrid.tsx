import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/layout";
import apiClient from "../services/apiClient";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getGames = async () => {
      try {
        const { data } = await apiClient.get<FetchGamesResponse>("/games");
        setGames(data.results);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };

    getGames();
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
