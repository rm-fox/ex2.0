import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const ChartComponent: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [areaSeries, setAreaSeries] = useState<any>(null);
  const [areaSeriesData, setAreaSeriesData] = useState([
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
  ]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create the chart inside the referenced container
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        textColor: 'black',
        background: { color: 'black' },
      },
    });

    const area = chart.addAreaSeries({
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });

    // Set initial data
    area.setData(areaSeriesData);

    chart.timeScale().fitContent();

    // Store the series in state
    setAreaSeries(area);

    // Clean up the chart when the component unmounts
    return () => {
      chart.remove();
    };
  }, [areaSeriesData]);

  // Function to format the date to 'yyyy-mm-dd'
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to add a day to the last date
  const getNextDate = (lastDateString: string): string => {
    const lastDate = new Date(lastDateString);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + 1); // Increment by one day
    return formatDate(nextDate);
  };

  // Function to append new data to the area series
  const addAreaDataLong = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);

      const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 10 - 5 }; // Simulate some random value
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData); // Reset the chart with new full data
      }

      return updatedData;
    });
  };

  const addAreaDataShort = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);

      const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 10 - 5 }; // Simulate some random value
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData); // Reset the chart with new full data
      }

      return updatedData;
    });
  };

  return (
    <div>
      <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />
      <button onClick={addAreaDataLong}>Add Area Data</button>
    
        {/* <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} /> */}
      <button onClick={addAreaDataShort}>Add Area Data</button>
  </div>
  );
};

export default ChartComponent;
