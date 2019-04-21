import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  Sector,
  Dot
} from "recharts";
import Head from "../components/Head";
import MenuNavegation from "../components/MenuNavegation";
import calculateColorPerModel from "../utils/calculateColorPerModel";

const dataPieChartWithPaddingAngle = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = calculateColorPerModel(
  dataPieChartWithPaddingAngle,
  "#C2F7E8",
  50
);

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

class Analytics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Pie1CX: null,
      Dot1CX: null,
      Pie2CX: null,
      Dot2CX: null
    };

    this.Pie1Ref = React.createRef();
    this.Pie2Ref = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        Pie1CX: this.Pie1Ref.current.clientWidth / 2,
        Dot1CX:
          this.Pie1Ref.current.clientWidth / 2 +
          this.Pie1Ref.current
            .getElementsByClassName("recharts-layer")[0]
            .getBBox().width /
            3,
        Pie2CX: this.Pie2Ref.current.clientWidth / 2,
        Dot2CX:
          this.Pie2Ref.current.clientWidth / 2 +
          this.Pie2Ref.current
            .getElementsByClassName("recharts-layer")[0]
            .getBBox().width /
            3
      });
    }, 2000);
  }

  render() {
    return (
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
                    tick={{
                      fill: "white"
                    }}
                    tickSize={10}
                    dataKey="name"
                    padding={{
                      left: 45,
                      right: 20
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    stroke="transparent"
                    tick={{
                      fill: "white"
                    }}
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

            <div className="CardsContainer">
              <div className="CardPie">
                <h2>Average Fill Level</h2>
                <div className="ChartContainer" ref={this.Pie1Ref}>
                  <ResponsiveContainer>
                    <PieChart>
                      <g>
                        <text
                          x={"50%"}
                          y={100}
                          dy={8}
                          textAnchor="middle"
                          className="CenterText"
                        >
                          550
                        </text>
                      </g>
                      {this.state.Pie1CX ? (
                        <g>
                          <Sector
                            fill="#00BF8E"
                            cx={this.state.Pie1CX}
                            cy={105}
                            innerRadius={53}
                            outerRadius={55}
                            startAngle={270}
                            endAngle={0}
                          />
                          <Dot
                            r={3}
                            cx={this.state.Dot1CX}
                            cy={105}
                            fill="#00BF8E"
                          />
                        </g>
                      ) : null}
                      <Pie
                        data={dataPieChartWithPaddingAngle}
                        cy={100}
                        innerRadius={65}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        startAngle={270}
                        endAngle={0}
                        dataKey="value"
                      >
                        {dataPieChartWithPaddingAngle.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="CardPie">
                <h2>Average Fill Level</h2>
                <div className="ChartContainer" ref={this.Pie2Ref}>
                  <ResponsiveContainer>
                    <PieChart>
                      <g>
                        <text
                          x={"50%"}
                          y={100}
                          dy={8}
                          textAnchor="middle"
                          className="CenterText"
                        >
                          550
                        </text>
                      </g>
                      {this.state.Pie2CX ? (
                        <g>
                          <Sector
                            fill="#00BF8E"
                            cx={this.state.Pie2CX}
                            cy={105}
                            innerRadius={53}
                            outerRadius={55}
                            startAngle={270}
                            endAngle={0}
                          />
                          <Dot
                            r={3}
                            cx={this.state.Dot2CX}
                            cy={105}
                            fill="#00BF8E"
                          />
                        </g>
                      ) : null}
                      <Pie
                        data={dataPieChartWithPaddingAngle}
                        cy={100}
                        innerRadius={65}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        startAngle={270}
                        endAngle={0}
                        dataKey="value"
                      >
                        {dataPieChartWithPaddingAngle.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
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

              .CardsContainer {
                padding: 24px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-template-rows: 1fr;
                grid-gap: 24px;

                > div {
                  height: 400px;
                  background: #ffffff;
                  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
                  padding: 40px;

                  &.CardPie {
                    text-align: center;

                    h2 {
                      font-family: Roboto;
                      font-style: normal;
                      font-weight: bold;
                      font-size: 18px;
                      line-height: normal;

                      color: #333333;
                    }
                  }

                  .ChartContainer {
                    width: 100%;
                    height: 100%;
                  }

                  .CenterText {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 27.9px;
                    line-height: normal;
                    fill: #333333;
                  }
                }
              }
            `}
          </style>
        </div>
      </>
    );
  }
}

export default Analytics;
