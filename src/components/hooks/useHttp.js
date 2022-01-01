import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers
          ? requestConfig.headers
          : { "Content-Type": "application/json" },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      setIsLoading(false);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          (data.error && data.error.message) || "Request failed!"
        );
      }
      applyData(data);
    } catch (err) {
      setIsLoading(false);

      setError(err.message || "Something went wrong!");
    }
  }, []);

  return {
    isLoading,
    error,
    setError,
    sendRequest,
  };
};

export default useHttp;
