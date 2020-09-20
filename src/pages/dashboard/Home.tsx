import React, { useEffect } from 'react';
import { useAsyncAction } from 'hooks';
import Chart from 'components/Chart';
import { getHistoricalData } from './helpers/home';

const Home: React.FC<any> = () => {
  const [
    { data, error, loading },
    fetchHistoricalData,
    cleanUp,
  ] = useAsyncAction(getHistoricalData);

  useEffect(() => {
    fetchHistoricalData();
    return cleanUp;
  }, [fetchHistoricalData, cleanUp]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Chart data={data} error={error} />;
};

export default Home;
