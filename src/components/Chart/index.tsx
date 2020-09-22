import React, { useEffect } from 'react';
import { useStatePersist } from 'use-state-persist';
import Chart from './Chart';
import { formatChartData } from './Chart.helpers';

export interface IChart {
  error?: string;
  data: string[];
  testId?: string;
  dataId: string;
  loading?: boolean;
}

const OHLCChart: React.FC<IChart> = (props) => {
  const { error, data, testId, dataId } = props;
  const [localData, setLocalData] = useStatePersist<any>(`@${dataId}`, []);
  useEffect(() => {
    if (data && data.length > 0) {
      setLocalData(data);
    }
  }, [data, setLocalData]);

  if (error) {
    return <div>{error}</div>;
  }
  if (!localData) {
    return <div>Loading</div>;
  }
  const chartData = formatChartData(localData);
  return <Chart type="hybrid" data={chartData} data-testid={testId} />;
};

OHLCChart.defaultProps = {
  testId: 'stock-chart',
};

export default OHLCChart;
