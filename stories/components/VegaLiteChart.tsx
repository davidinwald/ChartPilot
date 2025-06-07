import React from "react";
import * as vegaEmbed from "vega-embed";

interface VegaLiteChartProps {
  spec: any;
  width?: number;
  height?: number;
}

export const VegaLiteChart: React.FC<VegaLiteChartProps> = ({
  spec,
  width = 400,
  height = 300,
}) => {
  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chartRef.current) {
      vegaEmbed.default(chartRef.current, spec, {
        actions: false,
        width,
        height,
      });
    }
  }, [spec, width, height]);

  return <div ref={chartRef} />;
};
