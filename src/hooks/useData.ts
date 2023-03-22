import { AxiosError, AxiosRequestConfig, CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      const getData = async () => {
        setIsLoading(true);

        try {
          const { data: dataObj } = await apiClient.get<FetchResponse<T>>(
            endpoint,
            {
              signal: controller.signal,
              ...requestConfig,
            }
          );
          setData(dataObj.results);
          setIsLoading(false);
        } catch (error) {
          if (error instanceof CanceledError) return;
          setError((error as AxiosError).message);
          setIsLoading(false);
        }
      };

      getData();
      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
