/* Sample modified from react-stock charts */


import React from 'react';
import PropTypes from 'prop-types';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor
} from 'react-stockcharts/lib/coordinates';

import { discontinuousTimeScaleProviderBuilder } from 'react-stockcharts/lib/scale';
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip';
import { ema, sma, macd } from 'react-stockcharts/lib/indicator';
import { fitWidth } from 'react-stockcharts/lib/helper';
import ZoomButtons from "react-stockcharts/lib/ZoomButtons";

function getMaxUndefined(calculators) {
  return calculators.map(each => each.undefinedLength()).reduce((a, b) => Math.max(a, b));
}
const LENGTH_TO_SHOW = 180;

const processData = (inputData) => {
    const ema26 = ema()
      .id(0)
      .options({ windowSize: 26 })
      .merge((d, c) => {d.ema26 = c;})
      .accessor(d => d.ema26);

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d, c) => {d.ema12 = c;})
      .accessor(d => d.ema12);

    const macdCalculator = macd()
      .options({
        fast: 12,
        slow: 26,
        signal: 9,
      })
      .merge((d, c) => {d.macd = c;})
      .accessor(d => d.macd);

    const smaVolume50 = sma()
      .id(3)
      .options({
        windowSize: 50,
        sourcePath: 'volume',
      })
      .merge((d, c) => {d.smaVolume50 = c;})
      .accessor(d => d.smaVolume50);

    const maxWindowSize = getMaxUndefined([ema26,
      ema12,
      macdCalculator,
      smaVolume50
    ]);

    const dataToCalculate = inputData.slice(-LENGTH_TO_SHOW - maxWindowSize);

    const calculatedData = ema26(ema12(macdCalculator(smaVolume50(dataToCalculate))));
    const indexCalculator = discontinuousTimeScaleProviderBuilder().indexCalculator();
    const { index } = indexCalculator(calculatedData);

    const xScaleProvider = discontinuousTimeScaleProviderBuilder()
      .withIndex(index);
    const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(-LENGTH_TO_SHOW));
  return  {
      ema26,
      ema12,
      macdCalculator,
      smaVolume50,
      linearData,
      data: linearData,
      xScale,
      xAccessor, displayXAccessor
    };
};


class CandleStickChart extends React.Component {
  constructor(props) {
    super(props);
    this.handleDownloadMore = this.handleDownloadMore.bind(this);
  }
  state = {
      seriesNameSuffix:0
  };

  static getDerivedStateFromProps(props, state){
    if(props.data!==state.oldData){
        const seriesNameSuffix = props.data.length < 20 ? state.seriesNameSuffix + 1 : state.seriesNameSuffix;
      return {
        ...processData(props.data),
        oldData: props.data,
        seriesNameSuffix
      };
    }
    else return null;
  }
  handleDownloadMore(start, end) {
    if (Math.ceil(start) === end) return;
    // console.log("rows to download", rowsToDownload, start, end)
    const { data: prevData, ema26, ema12, macdCalculator, smaVolume50 } = this.state;
    const { data: inputData } = this.props;


    if (inputData.length === prevData.length) return;

    const rowsToDownload = end - Math.ceil(start);

    const maxWindowSize = getMaxUndefined([ema26,
      ema12,
      macdCalculator,
      smaVolume50
    ]);

    const dataToCalculate = inputData
      .slice(-rowsToDownload - maxWindowSize - prevData.length, - prevData.length);

    const calculatedData = ema26(ema12(macdCalculator(smaVolume50(dataToCalculate))));
    const indexCalculator = discontinuousTimeScaleProviderBuilder()
      .initialIndex(Math.ceil(start))
      .indexCalculator();
    const { index } = indexCalculator(
      calculatedData
        .slice(-rowsToDownload)
        .concat(prevData));

    const xScaleProvider = discontinuousTimeScaleProviderBuilder()
      .initialIndex(Math.ceil(start))
      .withIndex(index);

    const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData.slice(-rowsToDownload).concat(prevData));

      this.setState({
          data: linearData,
          xScale,
          xAccessor,
          displayXAccessor,
      });
  }
    handleReset = () => {
        this.setState({
            seriesNameSuffix: this.state.seriesNameSuffix + 1
        })
    };

  render() {
    const { type, width, ratio } = this.props;
    const { data, ema26, ema12, xScale, xAccessor, displayXAccessor,seriesNameSuffix } = this.state;

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={600}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        type={type}
        seriesName={`MSFT_${seriesNameSuffix}`}
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        onLoadMore={this.handleDownloadMore}
      >
        <Chart
          id={1}
          height={400}
          yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries />
          <OHLCTooltip origin={[-40, 0]} />
          <ZoomButtons onReset={this.handleReset} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}


CandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
};

CandleStickChart.defaultProps = {
  type: 'svg',
};

CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
