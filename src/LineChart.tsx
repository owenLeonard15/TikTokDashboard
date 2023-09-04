import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LineChartProps, Data } from './interfaces/interfaces.js'; // assuming interfaces are defined in interfaces.ts

function LineChart({ data, width, height, color }: LineChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)) as [Date, Date])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.views) as number])
      .range([height, 0]);

    // Create line generator
    const line = d3.line<Data>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.views));

    // Select SVG with ref
    const svg = d3.select(ref.current);

    // Add line to SVG
    const path = svg.selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('stroke', color)
      .attr('d', line);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Add axes to SVG
    svg.select('.x-axis')
      .style('transform', `translateY(${height}px)`)
      .call(xAxis);

    svg.select('.y-axis')
      .call(yAxis);
  }, [data, width, height, color]);

  return (
    <svg ref={ref} style={{ overflow: 'visible' }}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default LineChart;
