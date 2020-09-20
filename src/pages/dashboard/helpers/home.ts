import { fetchData } from 'hooks';

export const getHistoricalData = async () => {
  return fetchData({ uri: '/api/historical' });
};
