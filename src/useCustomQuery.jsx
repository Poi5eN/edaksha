import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useCustomQuery = (urlPath) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [queryData, setQueryData] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const authToken = Cookies.get('token');

  const refetch = useCallback(() => {
    setTrigger(prev => !prev);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
         urlPath,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setQueryData(response.data);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlPath, trigger, authToken]);

  return { queryData, error, loading, refetch };
};

export default useCustomQuery;
