import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChartPilot, DataFrame } from "../src";
import { EChartsChart } from "./components/EChartsChart";
import { sampleDatasets } from "./data/sampleDatasets";

const meta: Meta = {
  title: "ChartPilot/ECharts",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

// Common controls for all charts
const commonControls = {
  width: {
    control: { type: "range" as const, min: 200, max: 1000, step: 50 },
    defaultValue: 600,
  },
  height: {
    control: { type: "range" as const, min: 200, max: 800, step: 50 },
    defaultValue: 400,
  },
  dataset: {
    control: "select" as const,
    options: Object.keys(sampleDatasets),
    defaultValue: "Monthly Sales",
  },
};

// TypeScript interfaces for story arguments
interface BaseChartArgs {
  width: number;
  height: number;
  showLegend: boolean;
  showGrid: boolean;
  theme: "default" | "dark" | "light";
  dataset: string;
}

export const Docs: Story = {
  name: "Docs",
  render: () => <div>ECharts documentation and usage tips go here.</div>,
};

export const TimeSeries: StoryObj<BaseChartArgs> = {
  name: "Time Series",
  argTypes: {
    ...commonControls,
    showLegend: {
      control: "boolean" as const,
      defaultValue: true,
    },
    showGrid: {
      control: "boolean" as const,
      defaultValue: true,
    },
    theme: {
      control: "select" as const,
      options: ["default", "dark", "light"],
      defaultValue: "default",
    },
  },
  args: {
    dataset: "Monthly Sales",
    width: 600,
    height: 400,
    showLegend: true,
    showGrid: true,
    theme: "default",
  },
  render: (args) => {
    const datasetKey = args.dataset || "Monthly Sales";
    const selectedDataset = sampleDatasets[datasetKey];

    if (!selectedDataset) {
      console.error("Selected dataset not found:", datasetKey);
      return <div>Error: Dataset not found</div>;
    }

    try {
      const chartPilot = new ChartPilot(selectedDataset, {
        preferredLibrary: "echarts",
      });
      const configs = chartPilot.generateChartConfigs();
      const config = configs[0].config;

      config.legend = { ...config.legend, show: args.showLegend };
      config.grid = { ...config.grid, show: args.showGrid };

      if (args.theme === "dark") {
        config.backgroundColor = "#333";
        config.textStyle = { color: "#fff" };
        config.legend = { ...config.legend, textStyle: { color: "#fff" } };
        config.xAxis = {
          ...config.xAxis,
          axisLine: { lineStyle: { color: "#fff" } },
        };
        config.yAxis = {
          ...config.yAxis,
          axisLine: { lineStyle: { color: "#fff" } },
        };
      }

      return (
        <EChartsChart option={config} width={args.width} height={args.height} />
      );
    } catch (error) {
      console.error("Error creating chart:", error);
      return <div>Error: {error.message}</div>;
    }
  },
};

export const BarChart: StoryObj<
  BaseChartArgs & { orientation: "vertical" | "horizontal" }
> = {
  name: "Bar Chart",
  argTypes: {
    ...commonControls,
    showLegend: {
      control: "boolean" as const,
      defaultValue: true,
    },
    showGrid: {
      control: "boolean" as const,
      defaultValue: true,
    },
    theme: {
      control: "select" as const,
      options: ["default", "dark", "light"],
      defaultValue: "default",
    },
    orientation: {
      control: "select" as const,
      options: ["vertical", "horizontal"],
      defaultValue: "vertical",
    },
  },
  args: {
    dataset: "Product Categories",
    width: 600,
    height: 400,
    showLegend: true,
    showGrid: true,
    theme: "default",
    orientation: "vertical",
  },
  render: (args) => {
    const datasetKey = args.dataset || "Product Categories";
    const selectedDataset = sampleDatasets[datasetKey];

    if (!selectedDataset) {
      console.error("Selected dataset not found:", datasetKey);
      return <div>Error: Dataset not found</div>;
    }

    try {
      const chartPilot = new ChartPilot(selectedDataset, {
        preferredLibrary: "echarts",
      });
      const configs = chartPilot.generateChartConfigs();
      const config = configs[0].config;

      config.legend = { ...config.legend, show: args.showLegend };
      config.grid = { ...config.grid, show: args.showGrid };

      if (args.orientation === "horizontal") {
        config.xAxis = { ...config.xAxis, type: "value" };
        config.yAxis = { ...config.yAxis, type: "category" };
      }

      if (args.theme === "dark") {
        config.backgroundColor = "#333";
        config.textStyle = { color: "#fff" };
        config.legend = { ...config.legend, textStyle: { color: "#fff" } };
        config.xAxis = {
          ...config.xAxis,
          axisLine: { lineStyle: { color: "#fff" } },
        };
        config.yAxis = {
          ...config.yAxis,
          axisLine: { lineStyle: { color: "#fff" } },
        };
      }

      return (
        <EChartsChart option={config} width={args.width} height={args.height} />
      );
    } catch (error) {
      console.error("Error creating chart:", error);
      return <div>Error: {error.message}</div>;
    }
  },
};

export const PieChart: StoryObj<BaseChartArgs & { innerRadius: number }> = {
  name: "Pie Chart",
  argTypes: {
    ...commonControls,
    showLegend: {
      control: "boolean" as const,
      defaultValue: true,
    },
    theme: {
      control: "select" as const,
      options: ["default", "dark", "light"],
      defaultValue: "default",
    },
    innerRadius: {
      control: { type: "range" as const, min: 0, max: 0.8, step: 0.1 },
      defaultValue: 0,
    },
  },
  args: {
    dataset: "Market Share",
    width: 600,
    height: 400,
    showLegend: true,
    theme: "default",
    innerRadius: 0,
  },
  render: (args) => {
    const datasetKey = args.dataset || "Market Share";
    const selectedDataset = sampleDatasets[datasetKey];

    if (!selectedDataset) {
      console.error("Selected dataset not found:", datasetKey);
      return <div>Error: Dataset not found</div>;
    }

    try {
      const chartPilot = new ChartPilot(selectedDataset, {
        preferredLibrary: "echarts",
      });
      const configs = chartPilot.generateChartConfigs();
      const config = configs[0].config;

      config.legend = { ...config.legend, show: args.showLegend };

      if (args.innerRadius > 0) {
        config.series = config.series.map((series: any) => ({
          ...series,
          radius: [`${args.innerRadius * 100}%`, "70%"],
        }));
      }

      if (args.theme === "dark") {
        config.backgroundColor = "#333";
        config.textStyle = { color: "#fff" };
        config.legend = { ...config.legend, textStyle: { color: "#fff" } };
      }

      return (
        <EChartsChart option={config} width={args.width} height={args.height} />
      );
    } catch (error) {
      console.error("Error creating chart:", error);
      return <div>Error: {error.message}</div>;
    }
  },
};

export const ScatterPlot: StoryObj<BaseChartArgs & { pointSize: number }> = {
  name: "Scatter Plot",
  argTypes: {
    ...commonControls,
    showLegend: {
      control: "boolean" as const,
      defaultValue: true,
    },
    showGrid: {
      control: "boolean" as const,
      defaultValue: true,
    },
    theme: {
      control: "select" as const,
      options: ["default", "dark", "light"],
      defaultValue: "default",
    },
    pointSize: {
      control: { type: "range" as const, min: 10, max: 100, step: 5 },
      defaultValue: 50,
    },
  },
  args: {
    dataset: "Scatter Data",
    width: 600,
    height: 400,
    showLegend: true,
    showGrid: true,
    theme: "default",
    pointSize: 50,
  },
  render: (args) => {
    const datasetKey = args.dataset || "Scatter Data";
    const selectedDataset = sampleDatasets[datasetKey];

    if (!selectedDataset) {
      console.error("Selected dataset not found:", datasetKey);
      return <div>Error: Dataset not found</div>;
    }

    try {
      const chartPilot = new ChartPilot(selectedDataset, {
        preferredLibrary: "echarts",
      });
      const configs = chartPilot.generateChartConfigs();
      const config = configs[0].config;

      config.legend = { ...config.legend, show: args.showLegend };
      config.grid = { ...config.grid, show: args.showGrid };

      config.series = config.series.map((series: any) => ({
        ...series,
        symbolSize: args.pointSize,
      }));

      if (args.theme === "dark") {
        config.backgroundColor = "#333";
        config.textStyle = { color: "#fff" };
        config.legend = { ...config.legend, textStyle: { color: "#fff" } };
        config.xAxis = {
          ...config.xAxis,
          axisLine: { lineStyle: { color: "#fff" } },
        };
        config.yAxis = {
          ...config.yAxis,
          axisLine: { lineStyle: { color: "#fff" } },
        };
      }

      return (
        <EChartsChart option={config} width={args.width} height={args.height} />
      );
    } catch (error) {
      console.error("Error creating chart:", error);
      return <div>Error: {error.message}</div>;
    }
  },
};
