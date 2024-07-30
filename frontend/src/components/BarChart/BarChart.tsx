import { Bar } from 'react-chartjs-2';
import { BarElement, ChartData } from 'chart.js';
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

const BarChart = (props: { data: ChartData<'bar', number[], string> }) => {
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
      <Bar height={height} ref={chartRef} data={props.data} options={options} />
    </div>
  );
};

export default BarChart;
