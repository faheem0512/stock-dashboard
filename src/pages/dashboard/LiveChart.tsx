import React, {useEffect, useState} from 'react';
import Chart from 'components/Chart';
import useLiveData from './hooks/useLiveData';

const LiveChart: React.FC<any> = () => {
  const [data, error] = useLiveData();
  const [finalData, setFinalData] = useState<string[]>([]);
  useEffect(() => {
    /* as one data can't be plot on react-stockcharts (further investigation needed)*/
    if(data.length > 1){
      setFinalData(data);
    }
  },[data]);

  return <Chart data={finalData} error={error} dataId="live" />;
};

export default LiveChart;
