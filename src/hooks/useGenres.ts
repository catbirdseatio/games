import { AxiosError, CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getGenres = async () => {
      setIsLoading(true);

      try {
        const { data } = await apiClient.get<FetchGenresResponse>("/genres", {
          signal: controller.signal,
        });
        setGenres(data.results);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
        setIsLoading(false);
      }
    };

    getGenres();
    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
