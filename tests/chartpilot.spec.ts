import { test, expect } from "@playwright/test";
import { ChartPilot, DataFrame } from "../src";

test.describe("ChartPilot", () => {
  // Test data for different chart types
  const barData: DataFrame = {
    data: [
      { category: "A", value: 10 },
      { category: "B", value: 20 },
      { category: "C", value: 15 },
    ],
    columns: [
      { name: "category", type: "categorical" },
      { name: "value", type: "numeric" },
    ],
  };

  const timeSeriesData: DataFrame = {
    data: [
      { date: "2024-01", sales: 100, profit: 30 },
      { date: "2024-02", sales: 120, profit: 35 },
      { date: "2024-03", sales: 150, profit: 45 },
    ],
    columns: [
      { name: "date", type: "temporal" },
      { name: "sales", type: "numeric" },
      { name: "profit", type: "numeric" },
    ],
  };

  const scatterData: DataFrame = {
    data: [
      { x: 1, y: 2, size: 10, category: "A" },
      { x: 2, y: 3, size: 20, category: "B" },
      { x: 3, y: 4, size: 15, category: "A" },
    ],
    columns: [
      { name: "x", type: "numeric" },
      { name: "y", type: "numeric" },
      { name: "size", type: "numeric" },
      { name: "category", type: "categorical" },
    ],
  };

  const pieData: DataFrame = {
    data: [
      { category: "A", value: 30 },
      { category: "B", value: 40 },
      { category: "C", value: 30 },
    ],
    columns: [
      { name: "category", type: "categorical" },
      { name: "value", type: "numeric" },
    ],
  };

  test.describe("Constructor", () => {
    test("should throw error when data is undefined", () => {
      expect(() => new ChartPilot(undefined as any)).toThrow(
        "Data is required"
      );
    });

    test("should throw error when columns array is missing", () => {
      expect(() => new ChartPilot({ data: [] } as any)).toThrow(
        "Data must have a columns array"
      );
    });

    test("should throw error when data array is missing", () => {
      expect(() => new ChartPilot({ columns: [] } as any)).toThrow(
        "Data must have a data array"
      );
    });

    test("should initialize with default options", () => {
      const chartPilot = new ChartPilot(barData);
      expect(chartPilot).toBeDefined();
    });
  });

  test.describe("Chart Type Detection", () => {
    test("should detect bar chart for categorical and numeric data", () => {
      const chartPilot = new ChartPilot(barData);
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.mark || configs[0].config.series[0].type).toBe(
        "bar"
      );
    });

    test("should detect line chart for temporal and numeric data", () => {
      const chartPilot = new ChartPilot(timeSeriesData);
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.mark || configs[0].config.series[0].type).toBe(
        "line"
      );
    });

    test("should detect scatter plot for x,y numeric data", () => {
      const chartPilot = new ChartPilot(scatterData);
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.mark || configs[0].config.series[0].type).toBe(
        "point"
      );
    });

    test("should detect pie chart for proportional categorical data", () => {
      const chartPilot = new ChartPilot(pieData);
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.mark || configs[0].config.series[0].type).toBe(
        "arc"
      );
    });
  });

  test.describe("Vega-Lite Configuration", () => {
    test("should generate valid Vega-Lite schema", () => {
      const chartPilot = new ChartPilot(barData, {
        preferredLibrary: "vega-lite",
      });
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].type).toBe("vega-lite");
      expect(configs[0].config.$schema).toBe(
        "https://vega.github.io/schema/vega-lite/v5.json"
      );
    });

    test("should include data values in Vega-Lite config", () => {
      const chartPilot = new ChartPilot(barData, {
        preferredLibrary: "vega-lite",
      });
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.data.values).toEqual(barData.data);
    });

    test("should handle multiple numeric columns in time series", () => {
      const chartPilot = new ChartPilot(timeSeriesData, {
        preferredLibrary: "vega-lite",
      });
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.transform).toBeDefined();
      expect(configs[0].config.encoding.color).toBeDefined();
    });
  });

  test.describe("ECharts Configuration", () => {
    test("should generate valid ECharts config", () => {
      const chartPilot = new ChartPilot(barData, {
        preferredLibrary: "echarts",
      });
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].type).toBe("echarts");
      expect(configs[0].config.series[0].type).toBe("bar");
    });

    test("should handle multiple series in time series", () => {
      const chartPilot = new ChartPilot(timeSeriesData, {
        preferredLibrary: "echarts",
      });
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.series.length).toBe(2); // sales and profit
    });

    test("should include size encoding in scatter plot", () => {
      const chartPilot = new ChartPilot(scatterData, {
        preferredLibrary: "echarts",
      });
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.series[0].data[0].symbolSize).toBeDefined();
    });
  });

  test.describe("Plotly Configuration", () => {
    test("should generate valid Plotly config", () => {
      const chartPilot = new ChartPilot(barData, {
        preferredLibrary: "plotly",
      });
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].type).toBe("plotly");
      expect(configs[0].config.data[0].type).toBe("bar");
    });

    test("should handle multiple traces in time series", () => {
      const chartPilot = new ChartPilot(timeSeriesData, {
        preferredLibrary: "plotly",
      });
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.data.length).toBe(2); // sales and profit
    });

    test("should include marker size in scatter plot", () => {
      const chartPilot = new ChartPilot(scatterData, {
        preferredLibrary: "plotly",
      });
      const configs = chartPilot.generateChartConfigs();
      expect(configs[0].config.data[0].marker.size).toBeDefined();
    });
  });

  test.describe("Error Handling", () => {
    test("should handle empty data arrays", () => {
      const emptyData: DataFrame = {
        data: [],
        columns: [
          { name: "category", type: "categorical" },
          { name: "value", type: "numeric" },
        ],
      };
      const chartPilot = new ChartPilot(emptyData);
      const configs = chartPilot.generateChartConfigs();
      expect(configs.length).toBe(1);
    });

    test("should handle missing optional columns", () => {
      const partialData: DataFrame = {
        data: [{ x: 1, y: 2 }],
        columns: [
          { name: "x", type: "numeric" },
          { name: "y", type: "numeric" },
        ],
      };
      const chartPilot = new ChartPilot(partialData);
      const configs = chartPilot.generateChartConfigs();
      expect(configs.length).toBe(1);
    });
  });
});
