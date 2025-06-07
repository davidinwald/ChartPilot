import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "ChartPilot",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: "Overview",
  render: () => (
    <div style={{ maxWidth: "800px", padding: "20px" }}>
      <h1>ChartPilot</h1>
      <p>
        ChartPilot is a powerful charting library that supports multiple
        charting libraries:
      </p>
      <ul>
        <li>
          <strong>Vega-Lite</strong>: A high-level grammar of interactive
          graphics
        </li>
        <li>
          <strong>ECharts</strong>: A powerful, interactive charting and
          visualization library
        </li>
        <li>
          <strong>Plotly</strong>: A scientific graphing library for interactive
          data visualization
        </li>
      </ul>
      <p>
        Each chart library has its own strengths and use cases. Explore the
        different chart types and libraries in the navigation menu to find the
        best fit for your needs.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Multiple chart types (Time Series, Bar, Pie, Scatter)</li>
        <li>Interactive controls for customization</li>
        <li>Theme support (light/dark)</li>
        <li>Responsive layouts</li>
        <li>Legend and grid controls</li>
      </ul>
    </div>
  ),
};
