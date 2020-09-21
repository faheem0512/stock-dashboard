import moment from 'moment';

export const formatChartData = (data: string[]) => {
  return data.map((dataItem: string) => {
    const item: number[] = dataItem
      .split(',')
      .map((stringItem) => Number(stringItem));
    return [moment(item[0]).format('DD/MM/YYYY'), ...item.slice(1, 5)];
  });
};
