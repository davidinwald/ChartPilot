# ChartPilot

ChartPilot is a powerful abstraction layer for creating beautiful, interactive charts without worrying about the complexities of different charting libraries. It provides a unified interface to work with Vega-Lite, ECharts, and Plotly.js, allowing you to focus on your data and visualization goals rather than library-specific implementations.

## Why ChartPilot?

Working with multiple charting libraries can be challenging:

- Each library has its own configuration syntax and best practices
- Switching between libraries requires rewriting chart configurations
- Learning and maintaining multiple charting APIs is time-consuming
- Different libraries have different strengths and weaknesses

ChartPilot solves these problems by:

1. Providing a single, consistent API for all supported charting libraries
2. Automatically detecting the best chart type for your data
3. Generating optimized configurations for each library
4. Allowing easy switching between libraries without changing your code
5. Handling common features like themes, legends, and grids consistently

## Installation

```bash
npm install chart-pilot
```

## Quick Start

```typescript
import { ChartPilot, DataFrame } from "chart-pilot";

// Create a DataFrame with your data
const data = new DataFrame({
  data: [
    { date: "2024-01", sales: 100, profit: 30 },
    { date: "2024-02", sales: 120, profit: 35 },
    { date: "2024-03", sales: 150, profit: 45 },
  ],
  columns: [
    { name: "date", type: "temporal" },
    { name: "sales", type: "quantitative" },
    { name: "profit", type: "quantitative" },
  ],
});

// Create a ChartPilot instance
const chartPilot = new ChartPilot(data, {
  preferredLibrary: "vega-lite", // or 'echarts' or 'plotly'
});

// Generate chart configurations
const configs = chartPilot.generateChartConfigs();

// Use the configuration with your preferred charting library
// Example with Vega-Lite:
import { VegaLiteChart } from "chart-pilot/stories/components/VegaLiteChart";
<VegaLiteChart spec={configs[0].config} width={600} height={400} />;
```

## Supported Chart Types

ChartPilot automatically detects and generates appropriate configurations for:

- Time Series Charts
- Bar Charts (vertical and horizontal)
- Pie Charts
- Scatter Plots

## Advanced Usage

### Customizing Chart Appearance

```typescript
const chartPilot = new ChartPilot(data, {
  preferredLibrary: "echarts",
  options: {
    theme: "dark",
    showLegend: true,
    showGrid: true,
  },
});
```

### Switching Between Libraries

```typescript
// Start with Vega-Lite
const vegaConfig = new ChartPilot(data, {
  preferredLibrary: "vega-lite",
}).generateChartConfigs();

// Switch to ECharts
const echartsConfig = new ChartPilot(data, {
  preferredLibrary: "echarts",
}).generateChartConfigs();

// Switch to Plotly
const plotlyConfig = new ChartPilot(data, {
  preferredLibrary: "plotly",
}).generateChartConfigs();
```

### Working with Different Data Types

```typescript
// Time Series Data
const timeSeriesData = new DataFrame({
  data: [
    { date: "2024-01", value: 100 },
    { date: "2024-02", value: 120 },
  ],
  columns: [
    { name: "date", type: "temporal" },
    { name: "value", type: "quantitative" },
  ],
});

// Categorical Data
const categoricalData = new DataFrame({
  data: [
    { category: "A", value: 30 },
    { category: "B", value: 50 },
  ],
  columns: [
    { name: "category", type: "nominal" },
    { name: "value", type: "quantitative" },
  ],
});

// Scatter Plot Data
const scatterData = new DataFrame({
  data: [
    { x: 1, y: 2, size: 10, category: "A" },
    { x: 2, y: 3, size: 20, category: "B" },
  ],
  columns: [
    { name: "x", type: "quantitative" },
    { name: "y", type: "quantitative" },
    { name: "size", type: "quantitative" },
    { name: "category", type: "nominal" },
  ],
});
```

## The Power of Abstraction

ChartPilot's abstraction layer provides several key benefits:

1. **Consistent API**: Write your visualization code once and use it with any supported library.

2. **Automatic Optimization**: Each library has its strengths:

   - Vega-Lite excels at declarative specifications and automatic axis/scale handling
   - ECharts provides rich interactivity and animation capabilities
   - Plotly.js offers powerful 3D and scientific visualization features

3. **Future-Proof**: When new charting libraries emerge or existing ones improve, ChartPilot can add support without requiring changes to your code.

4. **Reduced Learning Curve**: Instead of learning multiple charting APIs, you only need to understand ChartPilot's simple interface.

5. **Maintainable Code**: Your visualization code remains clean and focused on the data and visualization goals, not implementation details.

## Next Steps

ChartPilot is actively evolving, and here are some planned improvements to make it even more powerful:

### Data Integration

- **Backend Integration**

  - Direct support for common DataFrame formats (Pandas, Polars, Arrow)
  - Automatic schema inference from JSON/CSV responses
  - Streaming data support for real-time updates
  - WebSocket integration for live data feeds
  - Caching and data persistence strategies

- **Data Processing**
  - Built-in data transformation pipelines
  - Time series aggregation and resampling
  - Statistical calculations and outlier detection
  - Data validation and type checking
  - Memory-efficient handling of large datasets

### Enhanced Chart Types

- Support for more complex visualizations like heatmaps, treemaps, and network graphs
- Multi-series charts with automatic color schemes and legends
- Faceted charts for comparing multiple dimensions
- Statistical charts (box plots, violin plots, etc.)
- Dashboard layouts with multiple coordinated views

### Advanced Features

- Interactive data filtering and aggregation
- Custom color palettes and themes
- Export to various formats (PNG, SVG, PDF)
- Responsive layouts and automatic resizing
- Accessibility improvements (ARIA labels, keyboard navigation)
- State management for complex interactions
- URL-based sharing of chart configurations

### Developer Experience

- React hooks for easy integration
- More comprehensive TypeScript types
- Better error messages and debugging tools
- Performance optimizations for large datasets
- Documentation improvements with more examples
- CLI tools for chart generation
- VS Code extension for development
- Storybook integration for component development

### Framework Integration

- **React Integration**

  - Custom hooks for data fetching and chart updates
  - Context providers for global chart settings
  - Server Components support
  - Suspense boundaries for loading states

- **Other Frameworks**
  - Vue.js components and composables
  - Svelte components and stores
  - Angular services and components
  - Web Components for framework-agnostic usage

### API Improvements

- **Configuration API**

  - Declarative chart composition
  - Pipeline-based data transformations
  - Event handling system
  - Plugin architecture for custom extensions

- **Performance**
  - Virtual rendering for large datasets
  - Web Worker support for heavy computations
  - Lazy loading of chart components
  - Bundle size optimizations

### Community Features

- Gallery of example visualizations
- Community-contributed chart templates
- Interactive playground for testing configurations
- Benchmarking tools for performance comparison
- Migration guides for existing charting code
- Data visualization best practices guide
- Community-driven chart type suggestions

### Enterprise Features

- **Security**

  - Data sanitization and validation
  - XSS prevention
  - CSP compliance
  - Audit logging

- **Monitoring**

  - Performance metrics collection
  - Error tracking
  - Usage analytics
  - Health checks

- **Deployment**
  - Docker images
  - CI/CD templates
  - Infrastructure as Code examples
  - Deployment guides for various platforms

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
