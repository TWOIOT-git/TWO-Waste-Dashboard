import { withAuthSync } from '../utils/auth'
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
  Dot,
  BarChart,
  Bar,
  Tooltip
} from "recharts";
import Head from "../components/Head";
import calculateColorPerModel from "../utils/calculateColorPerModel";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import breakpoints from "../utils/breakpoints";

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
    uv: 88000,
    pv: 400,
    amt: 2400
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 12890,
    pv: 4800,
    amt: 2181
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 2390,
    pv: 32800,
    amt: 2500
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const data2 = [
  {
    name: new Date().toLocaleDateString(),
    uv: 1231,
    pv: 24040,
    amt: 2400
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 680,
    pv: 3908,
    amt: 12400
  },
  {
    name: new Date().toLocaleDateString(),
    uv: 1445,
    pv: 34300,
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
    this.timeout = setTimeout(() => {
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

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { Dot1CX, Dot2CX, Pie1CX, Pie2CX } = this.state;
    return (
      <LayoutMenuNavegation>
        <Head title="lidbot - Analytics" />
        <div className="SimpleLineChartContainer">
          <ResponsiveContainer>
            <LineChart
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
                      x="50%"
                      y={100}
                      dy={8}
                      textAnchor="middle"
                      className="CenterText"
                    >
                      550
                    </text>
                  </g>
                  <If condition={Pie1CX}>
                    <g className="LineWithDot">
                      <Sector
                        fill="#00BF8E"
                        cx={Pie1CX}
                        cy={105}
                        innerRadius={53}
                        outerRadius={55}
                        startAngle={270}
                        endAngle={0}
                      />
                      <Dot r={3} cx={Dot1CX} cy={105} fill="#00BF8E" />
                    </g>
                  </If>
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
                    {dataPieChartWithPaddingAngle.map(({ name }, index) => (
                      <Cell key={`cell-${name}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="Dots-Numbers">
              {dataPieChartWithPaddingAngle.map(({ value, name }, index) => {
                return (
                  <div key={name}>
                    <svg height="16" width="16">
                      <circle cx="8" cy="8" r="8" fill={COLORS[index]} />
                    </svg>
                    <span>
                      {" "}
                      {">"} {value}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="TinyLineChart">
              <ResponsiveContainer>
                <LineChart data={data2}>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#2F5C31"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
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
                      x="50%"
                      y={100}
                      dy={8}
                      textAnchor="middle"
                      className="CenterText"
                    >
                      223420
                    </text>
                  </g>
                  <If condition={Pie2CX}>
                    <g className="LineWithDot">
                      <Sector
                        fill="#00BF8E"
                        cx={Pie2CX}
                        cy={105}
                        innerRadius={53}
                        outerRadius={55}
                        startAngle={270}
                        endAngle={0}
                      />
                      <Dot r={3} cx={Dot2CX} cy={105} fill="#00BF8E" />
                    </g>
                  </If>
                  <Pie
                    data={data}
                    cy={100}
                    innerRadius={65}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    startAngle={270}
                    endAngle={0}
                    dataKey="uv"
                  >
                    {data.map(({ name }, index) => (
                      <Cell key={`cell-${name}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="Dots-Numbers">
              {data.map(({ pv }, index) => {
                return (
                  <div key={pv}>
                    <svg height="16" width="16">
                      <circle cx="8" cy="8" r="8" fill={COLORS[index]} />
                    </svg>
                    <span>
                      {" "}
                      {">"} {pv}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="TinyLineChart">
              <ResponsiveContainer>
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#2F5C31"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>{" "}
          <div className="CardPie">
            <h2>Fill Level Reached Waste</h2>
            <h3>76</h3>
            <div className="BarChart">
              <ResponsiveContainer>
                <BarChart
                  data={data}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="linearGradientBarChart"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="2"
                    >
                      <stop offset="6%" stopColor="#C2F7E8" />
                      <stop offset="34%" stopColor="#00CD95" />
                      <stop offset="54%" stopColor="#007A5B" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#eaeaea" vertical={false} />
                  <XAxis
                    dataKey="pv"
                    tick={{
                      fill: "rgba(51, 51, 51, 0.2)",
                      fontSize: 12
                    }}
                    tickSize={10}
                    axisLine={false}
                    stroke="transparent"
                  />
                  <YAxis
                    tick={{
                      fill: "rgba(51, 51, 51, 0.2)",
                      fontSize: 12
                    }}
                    tickSize={10}
                    axisLine={false}
                    stroke="transparent"
                  />
                  <Tooltip />
                  <Bar
                    dataKey="uv"
                    fill="url(#linearGradientBarChart)"
                    barSize={3}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="CardPie">
            <h2>Fill Level Reached Recycling</h2>
            <h3>352</h3>
            <div className="BarChart">
              <ResponsiveContainer>
                <BarChart
                  data={data}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="linearGradientBarChart"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="2"
                    >
                      <stop offset="6%" stopColor="#C2F7E8" />
                      <stop offset="34%" stopColor="#00CD95" />
                      <stop offset="54%" stopColor="#007A5B" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#eaeaea" vertical={false} />
                  <XAxis
                    dataKey="pv"
                    tick={{
                      fill: "rgba(51, 51, 51, 0.2)",
                      fontSize: 12
                    }}
                    tickSize={10}
                    axisLine={false}
                    stroke="transparent"
                  />
                  <YAxis
                    tick={{
                      fill: "rgba(51, 51, 51, 0.2)",
                      fontSize: 12
                    }}
                    tickSize={10}
                    axisLine={false}
                    stroke="transparent"
                  />
                  <Tooltip />
                  <Bar
                    dataKey="uv"
                    fill="url(#linearGradientBarChart)"
                    barSize={3}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            @keyframes Enter {
              from {
                -webkit-transform: translateX(-28px);
                opacity: 0;
              }
              to {
                -webkit-transform: none;
                opacity: 1;
              }
            }

            @keyframes EnterSpan {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

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

              @media (max-width: ${breakpoints.tablet}) {
                grid-template-columns: 1fr 1fr;
                padding: 0;
                grid-gap: 0;
              }

              @media (max-width: ${breakpoints.phone}) {
                grid-template-columns: 1fr;
              }

              > div {
                height: 450px;
                background: #ffffff;
                box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;

                @media (max-width: ${breakpoints.tablet}) {
                  box-shadow: none;

                  &:nth-child(1),
                  &:nth-child(2) {
                    height: 300px;
                  }
                }

                &.CardPie {
                  text-align: center;

                  h2 {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 18px;
                    line-height: normal;
                    animation: Enter 0.5s forwards;
                    color: #333333;

                    @media (max-width: ${breakpoints.tablet}) {
                      font-size: 12px;
                    }
                  }

                  h3 {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 64px;
                    line-height: normal;
                    margin: 50px 0;

                    color: #333333;

                    @media (max-width: ${breakpoints.tablet}) {
                      font-size: 27px;
                    }
                  }
                }

                .BarChart {
                  width: 100%;
                  height: 50%;
                  margin: auto;
                  display: block;
                }

                .ChartContainer {
                  width: 100%;
                  height: 200px;

                  .LineWithDot {
                    animation: EnterSpan 1s forwards ease-in-out;
                  }
                }

                .CenterText {
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: bold;
                  font-size: 27.9px;
                  line-height: normal;
                  fill: #333333;
                }

                .Dots-Numbers {
                  margin-top: 10px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  @media (max-width: ${breakpoints.tablet}) {
                    display: none;
                  }

                  > div {
                    span {
                      font-family: Roboto;
                      font-style: normal;
                      font-weight: normal;
                      font-size: 12px;
                      line-height: normal;

                      color: #333333;

                      animation: EnterSpan 1s forwards ease-in-out;
                    }
                    svg {
                      animation: Enter 0.5s forwards;
                    }
                  }
                }

                .TinyLineChart {
                  margin-top: 20px;
                  height: 100px;
                  width: 100%;

                  @media (max-width: ${breakpoints.tablet}) {
                    display: none;
                  }
                }
              }
            }
          `}
        </style>
      </LayoutMenuNavegation>
    );
  }
}

export default withAuthSync(Analytics)
