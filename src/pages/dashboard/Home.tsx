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

  return <Chart data={data} error={error} dataId="home" loading={loading} />;
};

export default Home;
