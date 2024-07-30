import { Line } from 'react-chartjs-2';
import { BarElement } from 'chart.js';
import './LineChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { createLinearGradient } from '@/utils/linearGradient';
import { options } from './LineChart.utils';
import { IBreakpoints } from '@/types/IBreakpoints/IBreakpoints';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  BarElement,
);

ChartJS.defaults.font.family = 'Inter, sans-serif';
ChartJS.defaults.font.size = 11;
ChartJS.defaults.font.weight = 'bolder';

const LineChart = () => {
  // States
  const [height, setHeight] = useState<number>(0);

  // Refs
  const chartRef = useRef<any>(null);
  const chartIsInitRef = useRef<boolean>(false);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (chartIsInitRef.current) return;
    initializeChart();
  }, [height]);

  const onResize = () => {
    let height = 0;
    const width = window.innerWidth;
    if (width > IBreakpoints.PHONES_PORTAIT) height = 150;
    if (width > IBreakpoints.PHONES_LANDSCAPE) height = 175;
    if (width > IBreakpoints.TABLETS_PORTAIT) height = 200;
    if (width > IBreakpoints.TABLETS_LANDSCAPE) height = 225;
    if (width > IBreakpoints.LAPTOPS) height = 250;
    if (width > IBreakpoints.DESKTOPS) height = 275;
    setHeight(height);
    chartRef.current?.resize();
  };

  const initializeChart = () => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      const gradient1: CanvasGradient = createLinearGradient(
        ctx,
        chartArea,
        { r: 13, g: 255, b: 224 },
        0.15,
      );

      const gradient2: CanvasGradient = createLinearGradient(
        ctx,
        chartArea,
        { r: 61, g: 99, b: 221 },
        0.15,
      );

      const gradient3: CanvasGradient = createLinearGradient(
        ctx,
        chartArea,
        { r: 255, g: 149, b: 146 },
        0.15,
      );

      chart.data.datasets[0].backgroundColor = gradient1;
      chart.data.datasets[1].backgroundColor = gradient2;
      chart.data.datasets[2].backgroundColor = gradient3;
      chart.update();
    }
  };

  const data = {
    labels: [
      '10k',
      '20k',
      '30k',
      '40k',
      '50k',
      '60k',
      '70k',
      '80k',
      '90k',
      '100k',
      '110k',
      '120k',
      '130k',
      '140k',
      '150k',
      '160k',
      '170k',
      '180k',
      '190k',
    ],
    datasets: [
      {
        label: 'First dataset',
        data: [
          650, 590, 800, 810, 560, 550, 400, 450, 510, 460, 450, 430, 480, 580,
          590, 600, 620, 650, 700,
        ],
        borderColor: '#0DFFE0',
        fill: true,
      },
      {
        label: 'Second dataset',
        data: [
          400, 480, 450, 500, 490, 500, 450, 420, 440, 490, 520, 550, 530, 510,
          500, 480, 470, 440, 430,
        ],
        borderColor: '#0096FF',
        fill: true,
      },
      {
        label: 'Third dataset',
        data: [
          400, 480, 320, 450, 500, 250, 750, 420, 440, 490, 520, 600, 500, 510,
          250, 440, 470, 400, 430,
        ],
        borderColor: '#FF9592',
        fill: true,
      },
    ],
  };

  if (!height) return;

  return (
    <div className="wrapper">
      <Line height={height} ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default LineChart;
