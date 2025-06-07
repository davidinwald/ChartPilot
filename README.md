# ChartPilot

A TypeScript library for automatically generating chart configurations from dataframes. Supports multiple charting libraries including Vega-Lite and ECharts.

## Installation

```bash
npm install chartpilot
```

## Usage

```typescript
import { ChartPilot, DataFrame } from "chartpilot";

// Create a dataframe with metadata
const data: DataFrame = {
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

// Initialize ChartPilot
const chartPilot = new ChartPilot(data, {
  preferredLibrary: "vega-lite",
  maxCharts: 5,
});

// Generate chart configurations
const chartConfigs = chartPilot.generateChartConfigs();
```

## Features

- Automatic chart type detection based on data characteristics
- Support for multiple charting libraries (Vega-Lite, ECharts)
- TypeScript support with full type definitions
- Customizable chart generation options

## License

MIT
