



import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Chart = ({filter, chartId}) => {
  const width = window.innerWidth * .6;
  const height = window.innerHeight * .70;
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-project-0-dabvu'});  
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart, setChart] = useState(sdk.createChart({
    chartId: chartId,
    height: height,
    width: width
}));

  useEffect(() => {
    chart.render(chartDiv.current)
    .then(() => setRendered(true))
    .catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    setRendered(false)
    setChart(sdk.createChart({
      chartId: chartId,
      height: height,
      width: width,
      filter: filter
    }))
  }, [chartId])

  useEffect(() => {
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [filter, rendered]);

  return <div style={{"boxShadow": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", "borderTop": "1px solid lightgray"}} className="chart" ref={chartDiv}/>;
};

export default Chart;