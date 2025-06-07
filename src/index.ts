import { DataFrame, ChartConfig, ChartOptions } from "./types";

export class ChartPilot {
  private data: DataFrame;
  private options: ChartOptions;

  constructor(data: DataFrame, options: ChartOptions = {}) {
    if (!data) {
      throw new Error("Data is required");
    }
    if (!data.columns || !Array.isArray(data.columns)) {
      throw new Error("Data must have a columns array");
    }
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Data must have a data array");
    }

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
    } else if (this.options.preferredLibrary === "plotly") {
      configs.push(this.generatePlotlyConfig());
    }

    return configs;
  }

  private mapVegaLiteType(type: string): string {
    switch (type) {
      case "numeric":
        return "quantitative";
      case "categorical":
        return "nominal";
      case "temporal":
        return "temporal";
      case "ordinal":
        return "ordinal";
      default:
        return "nominal";
    }
  }

  private detectChartType(): string {
    try {
      if (!this.data) {
        throw new Error("Data is undefined");
      }
      if (!this.data.columns) {
        throw new Error("Data columns are undefined");
      }

      const columns = this.data.columns;
      const hasTemporal = columns.some((col) => col.type === "temporal");
      const hasMultipleNumeric =
        columns.filter((col) => col.type === "numeric").length > 1;
      const hasXYNumeric =
        columns.some((col) => col.name === "x" && col.type === "numeric") &&
        columns.some((col) => col.name === "y" && col.type === "numeric");
      const hasSize = columns.some(
        (col) => col.name === "size" && col.type === "numeric"
      );
      const hasCategory = columns.some((col) => col.type === "categorical");
      const hasSingleNumeric =
        columns.filter((col) => col.type === "numeric").length === 1;

      if (hasTemporal && hasMultipleNumeric) {
        return "line";
      } else if (hasXYNumeric) {
        return hasSize ? "point" : "scatter";
      } else if (hasCategory && hasSingleNumeric) {
        // For pie charts, we need to check if the data represents proportions
        const numericCol = columns.find((col) => col.type === "numeric");
        const total = this.data.data.reduce(
          (sum, row) => sum + (row[numericCol?.name || ""] as number),
          0
        );
        const isProportional = Math.abs(total - 100) < 0.01; // Check if values sum to approximately 100
        return isProportional ? "pie" : "bar";
      }
      return "bar"; // default fallback
    } catch (error) {
      console.error("Error in detectChartType:", error);
      console.error("Data state:", this.data);
      throw error;
    }
  }

  private generateVegaLiteConfig(): ChartConfig {
    const chartType = this.detectChartType();
    const config: any = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      data: {
        values: this.data.data,
      },
      mark: chartType === "pie" ? "arc" : chartType,
    };

    // Configure encoding based on chart type
    if (chartType === "line") {
      const temporalCol = this.data.columns.find(
        (col) => col.type === "temporal"
      );
      const numericCols = this.data.columns.filter(
        (col) => col.type === "numeric"
      );

      config.encoding = {
        x: {
          field: temporalCol?.name,
          type: "temporal",
          axis: { title: temporalCol?.name },
        },
        y: {
          field: numericCols[0].name,
          type: "quantitative",
          axis: { title: numericCols[0].name },
        },
      };

      // Add color encoding for multiple series
      if (numericCols.length > 1) {
        config.transform = [
          {
            fold: numericCols.map((col) => col.name),
            as: ["metric", "value"],
          },
        ];
        config.encoding.color = {
          field: "metric",
          type: "nominal",
        };
        config.encoding.y.field = "value";
      }
    } else if (chartType === "point" || chartType === "scatter") {
      const xCol = this.data.columns.find((col) => col.name === "x");
      const yCol = this.data.columns.find((col) => col.name === "y");
      const sizeCol = this.data.columns.find((col) => col.name === "size");
      const categoryCol = this.data.columns.find(
        (col) => col.type === "categorical"
      );

      config.encoding = {
        x: {
          field: xCol?.name,
          type: "quantitative",
          axis: { title: xCol?.name },
        },
        y: {
          field: yCol?.name,
          type: "quantitative",
          axis: { title: yCol?.name },
        },
      };

      if (sizeCol) {
        config.encoding.size = {
          field: sizeCol.name,
          type: "quantitative",
        };
      }

      if (categoryCol) {
        config.encoding.color = {
          field: categoryCol.name,
          type: "nominal",
        };
      }
    } else if (chartType === "pie") {
      const categoryCol = this.data.columns.find(
        (col) => col.type === "categorical"
      );
      const valueCol = this.data.columns.find((col) => col.type === "numeric");

      config.encoding = {
        theta: {
          field: valueCol?.name,
          type: "quantitative",
          stack: true,
        },
        color: {
          field: categoryCol?.name,
          type: "nominal",
        },
      };
    } else {
      // Default bar chart encoding
      const categoryCol = this.data.columns.find(
        (col) => col.type === "categorical"
      );
      const valueCol = this.data.columns.find((col) => col.type === "numeric");

      config.encoding = {
        x: {
          field: categoryCol?.name,
          type: "nominal",
          axis: { title: categoryCol?.name },
        },
        y: {
          field: valueCol?.name,
          type: "quantitative",
          axis: { title: valueCol?.name },
        },
      };
    }

    return {
      type: "vega-lite",
      config,
    };
  }

  private generateEChartsConfig(): ChartConfig {
    const chartType = this.detectChartType();
    const config: any = {};

    if (chartType === "line") {
      const temporalCol = this.data.columns.find(
        (col) => col.type === "temporal"
      );
      const numericCols = this.data.columns.filter(
        (col) => col.type === "numeric"
      );

      config.xAxis = {
        type: "category",
        data: this.data.data.map((d) => d[temporalCol?.name || ""]),
      };
      config.yAxis = {
        type: "value",
      };
      config.series = numericCols.map((col) => ({
        name: col.name,
        type: "line",
        data: this.data.data.map((d) => d[col.name]),
      }));
    } else if (chartType === "scatter" || chartType === "point") {
      const xCol = this.data.columns.find((col) => col.name === "x");
      const yCol = this.data.columns.find((col) => col.name === "y");
      const sizeCol = this.data.columns.find((col) => col.name === "size");
      const categoryCol = this.data.columns.find(
        (col) => col.type === "categorical"
      );

      config.xAxis = {
        type: "value",
        name: xCol?.name,
      };
      config.yAxis = {
        type: "value",
        name: yCol?.name,
      };
      config.series = [
        {
          type: "scatter",
          data: this.data.data.map((d) => ({
            value: [d[xCol?.name || ""], d[yCol?.name || ""]],
            symbolSize: sizeCol ? d[sizeCol.name] : 10,
            itemStyle: {
              color: categoryCol ? undefined : "#5470c6",
            },
          })),
        },
      ];
    } else if (chartType === "pie") {
      const categoryCol = this.data.columns.find(
        (col) => col.type === "categorical"
      );
      const valueCol = this.data.columns.find((col) => col.type === "numeric");

      config.series = [
        {
          type: "pie",
          data: this.data.data.map((d) => ({
            name: d[categoryCol?.name || ""],
            value: d[valueCol?.name || ""],
          })),
        },
      ];
    } else {
      // Default bar chart
      const categoryCol = this.data.columns.find(
        (col) => col.type === "categorical"
      );
      const valueCol = this.data.columns.find((col) => col.type === "numeric");

      config.xAxis = {
        type: "category",
        data: this.data.data.map((d) => d[categoryCol?.name || ""]),
      };
      config.yAxis = {
        type: "value",
      };
      config.series = [
        {
          type: "bar",
          data: this.data.data.map((d) => d[valueCol?.name || ""]),
        },
      ];
    }

    return {
      type: "echarts",
      config,
    };
  }

  private generatePlotlyConfig(): ChartConfig {
    const chartType = this.detectChartType();
    const config: any = {
      data: [],
      layout: {},
    };

    if (chartType === "line") {
      const temporalCol = this.data.columns.find(
        (col) => col.type === "temporal"
      );
      const numericCols = this.data.columns.filter(
        (col) => col.type === "numeric"
      );

      config.data = numericCols.map((col) => ({
        x: this.data.data.map((d) => d[temporalCol?.name || ""]),
        y: this.data.data.map((d) => d[col.name]),
        type: "scatter",
        mode: "lines",
        name: col.name,
      }));
    } else if (chartType === "scatter" || chartType === "point") {
      const xCol = this.data.columns.find((col) => col.name === "x");
      const yCol = this.data.columns.find((col) => col.name === "y");
      const sizeCol = this.data.columns.find((col) => col.name === "size");
      // const categoryCol = this.data.columns.find(
      //   (col) => col.type === "categorical"
      // );

      config.data = [
        {
          x: this.data.data.map((d) => d[xCol?.name || ""]),
          y: this.data.data.map((d) => d[yCol?.name || ""]),
          mode: "markers",
          type: "scatter",
          marker: {
            size: sizeCol ? this.data.data.map((d) => d[sizeCol.name]) : 10,
          },
        },
      ];
    } else if (chartType === "pie") {
      const categoryCol = this.data.columns.find(
        (col) => col.type === "categorical"
      );
      const valueCol = this.data.columns.find((col) => col.type === "numeric");

      config.data = [
        {
          values: this.data.data.map((d) => d[valueCol?.name || ""]),
          labels: this.data.data.map((d) => d[categoryCol?.name || ""]),
          type: "pie",
        },
      ];
    } else {
      // Default bar chart
      const categoryCol = this.data.columns.find(
        (col) => col.type === "categorical"
      );
      const valueCol = this.data.columns.find((col) => col.type === "numeric");

      config.data = [
        {
          x: this.data.data.map((d) => d[categoryCol?.name || ""]),
          y: this.data.data.map((d) => d[valueCol?.name || ""]),
          type: "bar",
        },
      ];
    }

    return {
      type: "plotly",
      config,
    };
  }
}

export * from "./types";
