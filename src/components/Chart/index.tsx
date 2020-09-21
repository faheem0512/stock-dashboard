import React, { useEffect } from 'react';
import Chart from 'react-google-charts';
import { useStatePersist } from 'use-state-persist';
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
  const [localData, setLocalData] = useStatePersist<any>(`@${  dataId}`, []);
  useEffect(() => {
    if (data && data.length > 0) {
      setLocalData(data);
    }
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  } if (!localData) {
    return <div>Loading</div>;
  }
  const chartData = formatChartData(localData);
  return (
    <div className="chart-container">
      <Chart
        width="100%"
        height={400}
        chartType="CandlestickChart"
        loader={<div>Loading Chart</div>}
        data={[['date', 'open', 'high', 'low', 'close'], ...chartData]}
        options={{
          legend: 'none',
        }}
        rootProps={{ 'data-testid': testId }}
      />
    </div>
  );
};

OHLCChart.defaultProps = {
  testId: 'stock-chart',
};

export default OHLCChart;
