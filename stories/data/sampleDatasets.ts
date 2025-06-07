import { DataFrame } from "../../src";

export const sampleDatasets: Record<string, DataFrame> = {
  "Monthly Sales": {
    data: [
      { date: "2024-01", sales: 100, profit: 30 },
      { date: "2024-02", sales: 120, profit: 35 },
      { date: "2024-03", sales: 115, profit: 32 },
      { date: "2024-04", sales: 130, profit: 40 },
      { date: "2024-05", sales: 140, profit: 45 },
    ],
    columns: [
      { name: "date", type: "temporal" as const },
      { name: "sales", type: "numeric" as const },
      { name: "profit", type: "numeric" as const },
    ],
  },
  "Product Categories": {
    data: [
      { category: "Electronics", value: 350 },
      { category: "Clothing", value: 250 },
      { category: "Food", value: 200 },
      { category: "Books", value: 150 },
      { category: "Other", value: 50 },
    ],
    columns: [
      { name: "category", type: "categorical" as const },
      { name: "value", type: "numeric" as const },
    ],
  },
  "Market Share": {
    data: [
      { category: "Electronics", value: 35 },
      { category: "Clothing", value: 25 },
      { category: "Food", value: 20 },
      { category: "Books", value: 15 },
      { category: "Other", value: 5 },
    ],
    columns: [
      { name: "category", type: "categorical" as const },
      { name: "value", type: "numeric" as const },
    ],
  },
  "Scatter Data": {
    data: [
      { x: 1, y: 2, size: 10, category: "A" },
      { x: 2, y: 4, size: 15, category: "B" },
      { x: 3, y: 3, size: 20, category: "A" },
      { x: 4, y: 5, size: 12, category: "B" },
      { x: 5, y: 4, size: 18, category: "A" },
    ],
    columns: [
      { name: "x", type: "numeric" as const },
      { name: "y", type: "numeric" as const },
      { name: "size", type: "numeric" as const },
      { name: "category", type: "categorical" as const },
    ],
  },
  "Temperature Data": {
    data: [
      { date: "2024-01", temperature: 20, humidity: 65 },
      { date: "2024-02", temperature: 22, humidity: 70 },
      { date: "2024-03", temperature: 25, humidity: 75 },
      { date: "2024-04", temperature: 28, humidity: 80 },
      { date: "2024-05", temperature: 30, humidity: 85 },
    ],
    columns: [
      { name: "date", type: "temporal" as const },
      { name: "temperature", type: "numeric" as const },
      { name: "humidity", type: "numeric" as const },
    ],
  },
};
