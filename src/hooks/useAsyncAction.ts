import { useState, useCallback } from 'react';
import { BASE_URL } from 'constants/apiConstants';
import { AsyncAction, FetchData, UseAsyncAction } from './index.interface';

export const useAsyncAction: UseAsyncAction = (action) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callAsyncAction = useCallback(async (params: AsyncAction) => {
    setLoading(true);
    setError(null);
    try {
      const response = await action(params);
      setData(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const cleanUp = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return [{ loading, data, error }, callAsyncAction, cleanUp];
};

export const fetchData = async ({
  url = BASE_URL,
  uri,
  options,
}: FetchData) => {
  const response = await fetch(url + uri, options);
  if (response.ok) {
    return response.json();
  }
  return new Error(response.statusText);
};
