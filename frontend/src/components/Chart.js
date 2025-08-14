import React from 'react';
import { Chart } from 'react-google-charts';

/**
 * Displays a line chart of weight over time using Google Charts.
 */
const ChartComponent = ({ entries }) => {
  // Prepare data. The header row defines column names for Google Charts.
  const data = [
    ['Date', 'Weight'],
    ...entries.map((entry) => [new Date(entry.date), Number(entry.weight)])
  ];

  const options = {
    title: 'Weight Over Time',
    hAxis: {
      title: 'Date',
      format: 'M/d/yy'
    },
    vAxis: {
      title: 'Weight (lbs)'
    },
    legend: { position: 'none' },
    colors: ['#007bff']
  };

  return (
    <div className="chart-container">
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default ChartComponent;