// useApi.ts
import { useState, useEffect } from "react";
import httpClient from "./httpClient";

/**
 * Custom React Hook to fetch data from an API endpoint.
 *
 * @param {string} url - The API endpoint URL to fetch data from.
 * @param {T | null} initialData - The initial state for the data.
 * @returns {{ data: T | null, isLoading: boolean, error: any }} - An object containing the API data, loading status, and any error.
 *
 * @example
 * const { data, isLoading, error } = useApi<string>('/api/some-data', 'initialValue');
 */
const useApi = <T>(
  url: string,
  initialData: T | null = null
): { data: T | null; isLoading: boolean; error: any } => {
  // State variables for data, loading status, and errors
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  // Side effect to fetch the data from API
  useEffect(() => {
    // Async function to fetch data from the API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await httpClient.get<T>(url);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useApi;
