import { IChartArea } from '@/types/IChartArea/IChartArea';
import { IRGB } from '@/types/IRGB/IRGB';

export const createLinearGradient = (
  ctx: CanvasRenderingContext2D,
  chartArea: IChartArea,
  baseColor: IRGB,
  opacityFactor: number,
): CanvasGradient => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top,
  );

  for (let i = 0; i <= 1; i += 0.1) {
    const step = Math.round(i * 10) / 10;
    const opacity = (step * opacityFactor).toFixed(3);
    const color = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity})`;
    gradient.addColorStop(step, color);
  }

  return gradient;
};
