import { test, expect } from "@playwright/test";
import { ChartPilot, DataFrame } from "../src";

test.describe("ChartPilot", () => {
  const sampleData: DataFrame = {
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

  test("should generate Vega-Lite config", () => {
    const chartPilot = new ChartPilot(sampleData, {
      preferredLibrary: "vega-lite",
    });
    const configs = chartPilot.generateChartConfigs();

    expect(configs.length).toBe(1);
    expect(configs[0].type).toBe("vega-lite");
    expect(configs[0].config.$schema).toBe(
      "https://vega.github.io/schema/vega-lite/v5.json"
    );
    expect(configs[0].config.mark).toBe("bar");
  });

  test("should generate ECharts config", () => {
    const chartPilot = new ChartPilot(sampleData, {
      preferredLibrary: "echarts",
    });
    const configs = chartPilot.generateChartConfigs();

    expect(configs.length).toBe(1);
    expect(configs[0].type).toBe("echarts");
    expect(configs[0].config.series[0].type).toBe("bar");
  });
});
