import React from 'react';
import Chart from 'components/Chart';
import useLiveData from './hooks/useLiveData';

const LiveChart: React.FC<any> = () => {
  const [data, error] = useLiveData();

  return <Chart data={data} error={error} />;
};

export default LiveChart;
