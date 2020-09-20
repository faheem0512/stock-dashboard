import React from 'react';
import moment from 'moment';
import Chart from 'react-google-charts';

export interface IChart {
  error?: string;
  data: string[];
  testId?: string;
}

const OHLCChart: React.FC<IChart> = (props) => {
  const { error, data, testId } = props;
  if (error) {
    return <div>{error}</div>;
  }
  if (!data || data.length < 1) {
    return <div>No Data</div>;
  }

  const chartData = data.map((dataItem: string) => {
    const item: number[] = dataItem
      .split(',')
      .map((stringItem) => Number(stringItem));
    return [moment(item[0]).format('DD/MM/YYYY'), ...item.slice(1, 5)];
  });
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
