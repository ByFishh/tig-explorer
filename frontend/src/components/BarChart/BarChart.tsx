import { Bar } from 'react-chartjs-2';
import { BarElement } from 'chart.js';
import './BarChart.css';
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { createLinearGradient } from '@/utils/linearGradient';
import { options } from './BarChart.utils';
import { IBreakpoints } from '@/types/IBreakpoints/IBreakpoints';

ChartJS.register(CategoryScale, LinearScale, BarElement);

ChartJS.defaults.font.family = 'Inter, sans-serif';
ChartJS.defaults.font.size = 11;
ChartJS.defaults.font.weight = 'bolder';

const BarChart = () => {
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

      const gradient: CanvasGradient = createLinearGradient(
        ctx,
        chartArea,
        { r: 61, g: 99, b: 221 },
        0.3,
      );
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
      chartIsInitRef.current = true;
    }
  };

  if (!height) return;

  return (
    <div className="wrapper">
      <Bar
        height={height}
        ref={chartRef}
        data={{
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
                650, 590, 800, 810, 560, 550, 400, 450, 510, 460, 450, 430, 480,
                580, 590, 600, 620, 650, 700,
              ],
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#3D63DD',
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default BarChart;
