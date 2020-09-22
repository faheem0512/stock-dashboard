const DATA_TYPE = ['date', 'open', 'high', 'low', 'close', 'volume'];

export const formatChartData = (data: string[]) => {
  return data.map((dataItem: string) => {
    const item: number[] = dataItem
      .split(',')
      .map((stringItem) => Number(stringItem));
    const formattedData: any = {};
    item.forEach((val, index) => {
      formattedData[DATA_TYPE[index]] = index ? val : new Date(val);
    });
    return formattedData;
  });
};
