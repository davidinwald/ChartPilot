export interface ColumnMetadata {
  name: string;
  type: "numeric" | "categorical" | "temporal" | "ordinal";
  description?: string;
}

export interface DataFrame {
  data: Record<string, any>[];
  columns: ColumnMetadata[];
}

export interface ChartConfig {
  type: "vega-lite" | "echarts";
  config: any; // This will be more specific based on the chart type
}

export interface ChartOptions {
  preferredLibrary?: "vega-lite" | "echarts";
  chartTypes?: string[];
  maxCharts?: number;
}
