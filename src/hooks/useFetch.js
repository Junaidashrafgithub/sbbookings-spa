// src/hooks/useFetch.js
import { useState, useEffect } from "react";

const useFetch = (apiFunc, ...args) => {
  debugger;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiFunc(...args);
        setData(result);
      } catch (err) {
        console.error("Error occurred:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiFunc, ...args]);

  return { data, loading, error };
};

export default useFetch;
