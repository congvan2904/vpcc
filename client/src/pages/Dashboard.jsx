import React from 'react'
import { Chart } from "react-google-charts"
import './chart.scss'
export const dataPie = [
  ["Hồ Sơ", "Số bộ"],
  ["Hồng", 5.85],
  ["Sơn", 1.66],
  ["Thủy", 0.316],
  ["Lực", 0.0791],
  ["Tiện", 5.85],
  ["Tin", 5.85],
  ["Ngân", 5.85],
  ["Quang", 5.85]
];

export const optionsPie = {
  legend: "none",
  pieSliceText: "label",
  title: "Biểu đồ tròn",
  pieStartAngle: 100,
};
export const dataBar = [
  [
    "Element",
    "Hồ sơ nợ",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ],
  ["Hồng", 8.94, "#b87333", 10],
  ["Lực", 10.49, "silver", null],
  ["Thông", 19.3, "gold", null],
  ["Sơn", 21.45, "color: #e5e4e2", null],
  ["Thủy", 8.94, "#b87333", 10],
  ["Tiện", 10.49, "silver", null],
  ["Tin", 19.3, "gold", null],
  ["Ngân", 21.45, "color: #e5e4e2", null],
  ["Quang", 8.94, "#b87333", 10],
  ["Nga", 10.49, "silver", null],
];

export const optionsBar = {
  title: "Biểu đồ cột",
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

const Dashboard = () => {
  return (
  <>
    <h1>Dashboard</h1>
    <div className="wrap-chart">
      <Chart
      chartType="PieChart"
      data={dataPie}
      options={optionsPie}
      width={"100%"}
      height={"100%"}
      />
    </div>
    <div className="wrap-chart-bar">
    <Chart
      chartType="BarChart"
      width="100%"
      height="100%"
      data={dataBar}
      options={optionsBar}
    />
    </div>
  </>
  )
}

export default Dashboard