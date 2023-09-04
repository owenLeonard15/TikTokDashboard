import React from 'react';
import * as d3 from 'd3';
import LineChart from './LineChart.tsx';
import { MultiLineChartProps, Data } from './interfaces/interfaces';

function MultiLineChart({ data, width, height }: MultiLineChartProps) {
  // create a color scale
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  console.log(data)
  // aggregate data by hashtag
  const hashtags: Data[][] = Array.from(d3.group(data, d => d.hashtag).values(), item => item as Data[]);

  return (
    <svg width={width} height={height}>
      {hashtags.map((hashtagData, i) => (
        <LineChart
          key={i}
          data={hashtagData}
          width={width}
          height={height / hashtags.length}
          color={colorScale(i) as string}
        />
      ))}
    </svg>
  );
}

export default MultiLineChart;
