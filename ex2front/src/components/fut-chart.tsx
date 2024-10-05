
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import BuyLongButton from "./buy-long-button";

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

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
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

    area.setData(areaSeriesData);
    chart.timeScale().fitContent();

    setAreaSeries(area);

    const interval = setInterval(() => {
      setAreaSeriesData((prevData) => {
        const lastDataPoint = prevData[prevData.length - 1];
        const nextDate = getNextDate(lastDataPoint.time);
        const newValue = lastDataPoint.value + (Math.random() * 2 - 1);
        const newData = { time: nextDate, value: parseFloat(newValue.toFixed(2)) };
        const updatedData = [...prevData, newData];

        if (areaSeries) {
          areaSeries.setData(updatedData);
        }

        return updatedData;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      chart.remove();
    };
  }, [areaSeriesData]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getNextDate = (lastDateString: string): string => {
    const lastDate = new Date(lastDateString);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + 1);
    return formatDate(nextDate);
  };

  const addAreaDataLong = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);
      const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 5 };
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData);
      }

      return updatedData;
    });
  };

  const addAreaDataShort = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);
      const newData = { time: nextDate, value: lastDataPoint.value - Math.random() * 5 };
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData);
      }

      return updatedData;
    });
  };

  const addAreaDataNoise = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);
      const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 10 - 5 };
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData);
      }

      return updatedData;
    });
  };

  const addAreaDataBuy = () => {
    setAreaSeriesData((prevData) => {
      const lastDataPoint = prevData[prevData.length - 1];
      const nextDate = getNextDate(lastDataPoint.time);
      const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 5 };
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData);
      }

      return updatedData;
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div ref={chartContainerRef} style={{ width: '600px', height: '500px' }} />
      <button onClick={addAreaDataBuy}>Buy Data</button>
      <BuyLongButton addAreaDataLong={addAreaDataLong} />
      <button onClick={addAreaDataShort}>Sell Data</button>
      <button onClick={addAreaDataNoise}>Add Noise</button>
    </div>
  );
};

export default ChartComponent;
