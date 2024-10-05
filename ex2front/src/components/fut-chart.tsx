
// import React, { useEffect, useRef, useState } from 'react';
// import { createChart } from 'lightweight-charts';
// import BuyLongButton from "./buy-long-button";

// const ChartComponent: React.FC = () => {
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const [areaSeries, setAreaSeries] = useState<any>(null);
//   const [baselineSeries, setBaselineSeries] = useState<any>(null);
//   const [areaSeriesData, setAreaSeriesData] = useState([
//     { time: '2018-12-22', value: 27.51 },
//     { time: '2018-12-23', value: 24.11 },
//     { time: '2018-12-24', value: 23.02 },
//     { time: '2018-12-25', value: 22.32 },
//     { time: '2018-12-26', value: 23.17 },
//     { time: '2018-12-27', value: 24.89 },
//     { time: '2018-12-28', value: 23.46 },
//     { time: '2018-12-29', value: 23.92 },
//     { time: '2018-12-30', value: 22.68 },
//     { time: '2018-12-31', value: 22.67 },
//   ]);

//   useEffect(() => {
//     if (!chartContainerRef.current) return;


//     const chart = createChart(chartContainerRef.current, {
//         width: chartContainerRef.current.clientWidth,
//         height: 500,
//         layout: {
//           textColor: 'black',
//           background: { color: 'transparent' }, // Make the background transparent
//         },
//       });


//     const chartContainer = chartContainerRef.current;
//     if (chartContainer) {
//     chartContainer.style.background = 'linear-gradient(to bottom, #020024, #4f485e)';
//     }

//     const area = chart.addAreaSeries({
//     //   lineColor: '#2962FF',
//     //   topColor: '#2962FF',
//       bottomColor: 'rgba(41, 98, 255, 0.28)',
//     });

    
//     // chart.timeScale().fitContent();
//     // setAreaSeries(area);

//     // Create the baseline series
//     const baseline = chart.addBaselineSeries({
//       baseValue: { type: 'price', price: 25 }, // Lock baseline price to 23
//       topLineColor: 'rgba(38, 166, 154, 1)',
//       topFillColor1: 'rgba(38, 166, 154, 0.28)',
//       topFillColor2: 'rgba(38, 166, 154, 0.05)',
//       bottomLineColor: 'rgba(239, 83, 80, 1)',
//       bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
//       bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
//     });

//     // Set baseline data, using timestamps in seconds
//     const baselineData = [
//       { time: '2018-12-22', value: 25 },
//       { time: '2018-12-23', value: 25 },
//       { time: '2018-12-24', value: 25 },
//       { time: '2018-12-25', value: 25 },
//       { time: '2018-12-26', value: 25 },
//       { time: '2018-12-27', value: 25 },
//       { time: '2018-12-28', value: 25 },
//       { time: '2018-12-29', value: 25 },
//       { time: '2018-12-30', value: 25 },
//       { time: '2500-04-31', value: 25 },
//     ];
    
//     baseline.setData(areaSeriesData);
//     chart.timeScale().fitContent();

//     area.setData(baselineData);

//     setBaselineSeries(baseline);
    

//     const interval = setInterval(() => {
//       setAreaSeriesData((prevData) => {
//         const lastDataPoint = prevData[prevData.length - 1];
//         const nextDate = getNextDate(lastDataPoint.time);
//         const newValue = lastDataPoint.value + (Math.random() - 0.5);
//         const newData = { time: nextDate, value: parseFloat(newValue.toFixed(2)) };
//         const updatedData = [...prevData, newData];

//         if (areaSeries) {
//           areaSeries.setData(updatedData);
//         }

//         return updatedData;
//       });
//     }, 200);

//     return () => {
//       clearInterval(interval);
//       chart.remove();
//     };
//   }, [areaSeriesData]);

//   const formatDate = (date: Date): string => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const getNextDate = (lastDateString: string): string => {
//     const lastDate = new Date(lastDateString);
//     const nextDate = new Date(lastDate);
//     nextDate.setDate(lastDate.getDate() + 1);
//     return formatDate(nextDate);
//   };

//   const addAreaDataLong = () => {
//     setAreaSeriesData((prevData) => {
//       const lastDataPoint = prevData[prevData.length - 1];
//       const nextDate = getNextDate(lastDataPoint.time);
//       const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 5 };
//       const updatedData = [...prevData, newData];

//       if (areaSeries) {
//         areaSeries.setData(updatedData);
//       }

//       return updatedData;
//     });
//   };

//   const addAreaDataShort = () => {
//     setAreaSeriesData((prevData) => {
//       const lastDataPoint = prevData[prevData.length - 1];
//       const nextDate = getNextDate(lastDataPoint.time);
//       const newData = { time: nextDate, value: lastDataPoint.value - Math.random() * 5 };
//       const updatedData = [...prevData, newData];

//       if (areaSeries) {
//         areaSeries.setData(updatedData);
//       }

//       return updatedData;
//     });
//   };

//   const addAreaDataNoise = () => {
//     setAreaSeriesData((prevData) => {
//       const lastDataPoint = prevData[prevData.length - 1];
//       const nextDate = getNextDate(lastDataPoint.time);
//       const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 10 - 5 };
//       const updatedData = [...prevData, newData];

//       if (areaSeries) {
//         areaSeries.setData(updatedData);
//       }

//       return updatedData;
//     });
//   };

//   const addAreaDataBuy = () => {
//     setAreaSeriesData((prevData) => {
//       const lastDataPoint = prevData[prevData.length - 1];
//       const nextDate = getNextDate(lastDataPoint.time);
//       const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 5 };
//       const updatedData = [...prevData, newData];

//       if (areaSeries) {
//         areaSeries.setData(updatedData);
//       }

//       return updatedData;
//     });
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//       <div ref={chartContainerRef} style={{ width: '1500px', height: '500px' }} />
//       <button onClick={addAreaDataBuy}>Buy Data</button>
//       <BuyLongButton addAreaDataLong={addAreaDataLong} />
//       <button onClick={addAreaDataShort}>Sell Data</button>
//       <button onClick={addAreaDataNoise}>Add Noise</button>
//     </div>
//   );
// };

// export default ChartComponent;

import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import BuyLongButton from "./buy-long-button";

const ChartComponent: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [areaSeries, setAreaSeries] = useState<any>(null);
  const [baselineSeries, setBaselineSeries] = useState<any>(null);
  const [areaSeriesData, setAreaSeriesData] = useState([
    { time: '2018-12-22', value: 27.51 },
    { time: '2018-12-23', value: 24.11 },
    { time: '2018-12-24', value: 23.02 },
    { time: '2018-12-25', value: 22.32 },
    { time: '2018-12-26', value: 23.17 },
    { time: '2018-12-27', value: 24.89 },
    { time: '2018-12-28', value: 23.46 },
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
        background: { color: 'transparent' }, // Make the background transparent
      },
    });

    const chartContainer = chartContainerRef.current;
    if (chartContainer) {
      chartContainer.style.background = 'linear-gradient(to bottom, #020024, #4f485e)';
    }

    const area = chart.addAreaSeries({
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });

    const baseline = chart.addBaselineSeries({
      baseValue: { type: 'price', price: 25 },
      topLineColor: 'rgba(38, 166, 154, 1)',
      topFillColor1: 'rgba(38, 166, 154, 0.28)',
      topFillColor2: 'rgba(38, 166, 154, 0.05)',
      bottomLineColor: 'rgba(239, 83, 80, 1)',
      bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
    });

    const baselineData = [
      { time: '2018-12-22', value: 25 },
      { time: '2018-12-23', value: 25 },
      { time: '2018-12-24', value: 25 },
      { time: '2018-12-25', value: 25 },
      { time: '2018-12-26', value: 25 },
      { time: '2018-12-27', value: 25 },
      { time: '2018-12-28', value: 25 },
      { time: '2018-12-29', value: 25 },
      { time: '2018-12-30', value: 25 },
      { time: '2500-04-31', value: 25 },
    ];
    
    baseline.setData(areaSeriesData);
    chart.timeScale().fitContent();

    area.setData(baselineData);

    setBaselineSeries(baseline);
    
    const interval = setInterval(() => {
      setAreaSeriesData((prevData) => {
        const lastDataPoint = prevData[prevData.length - 1];
        const nextDate = getNextDate(lastDataPoint.time);
        const newValue = lastDataPoint.value + (Math.random() - 0.5);
        const newData = { time: nextDate, value: parseFloat(newValue.toFixed(2)) };
        const updatedData = [...prevData, newData];

        if (areaSeries) {
          areaSeries.setData(updatedData);
        }

        return updatedData;
      });
    }, 200);

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
      const newData = { time: nextDate, value: lastDataPoint.value - Math.random() * 2 };
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
      const newData = { time: nextDate, value: lastDataPoint.value + Math.random() * 2 };
      const updatedData = [...prevData, newData];

      if (areaSeries) {
        areaSeries.setData(updatedData);
      }

      return updatedData;
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '20px' }}> {/* This is the container for the chart */}
        <div ref={chartContainerRef} style={{ width: '1200px', height: '500px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}> {/* Buttons container */}
        <button onClick={addAreaDataBuy}></button>
        <BuyLongButton addAreaDataLong={addAreaDataLong} />
        <button onClick={addAreaDataShort}>Sell GPUZ4</button>
        <button onClick={addAreaDataNoise}></button>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center all elements horizontally
      width: '100%', // Ensure full width
    },
    buttonContainer: {
      marginTop: '20px', // Space above buttons
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%', // Take full width for buttons
    },
  };

export default ChartComponent;
