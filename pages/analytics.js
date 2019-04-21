import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import Head from "../components/Head";
import MenuNavegation from "../components/MenuNavegation";

const data = [
  {
    name: new Date().toLocaleDateString(),
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const Analytics = () => (
  <>
    <Head title="lidbot - Analytics" />
    <div className="LayoutFlex">
      <MenuNavegation
        userImage="https://www.brand-her.com/wp-content/uploads/2014/02/team1.jpg"
        userName="Carl"
      />
      <div className="Content">
        <div className="SimpleLineChartContainer">
          <ResponsiveContainer>
            <LineChart
              width="100%"
              height="100%"
              data={data}
              margin={{
                top: 100 / 2,
                right: 100 / 2,
                left: 100 / 2,
                bottom: 100 / 2
              }}
            >
              <CartesianGrid
                stroke="rgba(255, 255, 255, 0.1)"
                vertical={false}
              />
              <XAxis
                axisLine={false}
                stroke="transparent"
                tick={{ fill: "white" }}
                tickSize={10}
                dataKey="name"
                padding={{ left: 45, right: 20 }}
              />
              <YAxis
                axisLine={false}
                stroke="transparent"
                tick={{ fill: "white" }}
                tickSize={10}
              />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="white"
                strokeWidth={5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#003B2C"
                strokeWidth={5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <style jsx>
        {`
          .LayoutFlex {
            display: flex;
          }

          .LayoutFlex > .Content {
            flex: 1;
          }

          .SimpleLineChartContainer {
            background: linear-gradient(180deg, #00c08f 0%, #007355 100%);
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            height: 450px;
          }
        `}
      </style>
    </div>
  </>
);

export default Analytics;
