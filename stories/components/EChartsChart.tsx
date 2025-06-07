import React from "react";
import * as echarts from "echarts";

interface EChartsChartProps {
  option: any;
  width?: number;
  height?: number;
}

export const EChartsChart: React.FC<EChartsChartProps> = ({
  option,
  width = 400,
  height = 300,
}) => {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const chartInstance = React.useRef<echarts.ECharts | null>(null);

  React.useEffect(() => {
    if (chartRef.current) {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
      }
      chartInstance.current.setOption(option);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [option]);

  return <div ref={chartRef} style={{ width, height }} />;
};
