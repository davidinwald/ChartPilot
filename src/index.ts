import { DataFrame, ChartConfig, ChartOptions } from "./types";

export class ChartPilot {
  private data: DataFrame;
  private options: ChartOptions;

  constructor(data: DataFrame, options: ChartOptions = {}) {
    this.data = data;
    this.options = {
      preferredLibrary: "vega-lite",
      maxCharts: 5,
      ...options,
    };
  }

  generateChartConfigs(): ChartConfig[] {
    const configs: ChartConfig[] = [];

    // Basic implementation - will be expanded
    if (this.options.preferredLibrary === "vega-lite") {
      configs.push(this.generateVegaLiteConfig());
    } else if (this.options.preferredLibrary === "echarts") {
      configs.push(this.generateEChartsConfig());
    }

    return configs;
  }

  private generateVegaLiteConfig(): ChartConfig {
    // Basic Vega-Lite configuration
    return {
      type: "vega-lite",
      config: {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        data: {
          values: this.data.data,
        },
        mark: "bar",
        encoding: {
          x: {
            field: this.data.columns[0].name,
            type: this.data.columns[0].type,
          },
          y: {
            field: this.data.columns[1].name,
            type: this.data.columns[1].type,
          },
        },
      },
    };
  }

  private generateEChartsConfig(): ChartConfig {
    // Basic ECharts configuration
    return {
      type: "echarts",
      config: {
        xAxis: {
          type: "category",
          data: this.data.data.map((d) => d[this.data.columns[0].name]),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.data.data.map((d) => d[this.data.columns[1].name]),
            type: "bar",
          },
        ],
      },
    };
  }
}

export * from "./types";
