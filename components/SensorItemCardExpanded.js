import React from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { withTranslation } from "../i18n";
import moment from "moment";

const SensorItemCardExpanded = ({
  sensor_id,
  fill_percentage,
  reports,
  bin_type,
  bin_location,
  updated_on,
  min_distance,
  max_distance,
  latitude,
  longitude,
  firmware_version,
  battery,
  t,
  active,
  onClick
}) => {
  return (
    <article>
      <div className="SensorItemCardHeader">
        <div>
          <span
            className={`status ${fill_percentage < 50 ? "green" : "red"}`}
          />
          <h2>
            <a>{sensor_id}</a>
          </h2>
          <p>{bin_type}</p>
          <p>{firmware_version}</p>
        </div>
      </div>
      <div className="SensorItemCardContent">
        <div>
          <div>
            <p>{t("status")}:</p>
            <h3>{Math.round(fill_percentage)}%</h3>
            <h5>{moment.unix(updated_on).fromNow()}</h5>
          </div>
          <div>
            <p>{t("location")}:</p>
            <h4>{bin_location}</h4>
            <p>{t("battery")}:</p>
            <h4 className={`status ${battery > 20 ? "green" : "red"}`}>
              {battery}%
            </h4>
            <h5>{longitude}</h5>
            <h5>{latitude}</h5>
          </div>
        </div>
      </div>
      <div className="SensorItemCardFooter">
        <div className="chart-header">
          <h3>{t("fill-level")}</h3>
          <div className="time-buttons">
            <div
              onClick={() => onClick("6")}
              className={active === "6" ? "active" : ""}
            >
              6 {t("hour")}
            </div>
            <div
              onClick={() => onClick("12")}
              className={active === "12" ? "active" : ""}
            >
              12 {t("hour")}
            </div>
            <div
              onClick={() => onClick("24")}
              className={active === "24" ? "active" : ""}
            >
              1 {t("day")}
            </div>
            <div
              onClick={() => onClick("72")}
              className={active === "72" ? "active" : ""}
            >
              3 {t("days")}
            </div>
            <div
              onClick={() => onClick("168")}
              className={active === "168" ? "active" : ""}
            >
              1 {t("week")}
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={reports}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="t" padding={{ left: 20, right: 20 }} />
            <YAxis />
            <CartesianGrid tickCount="3" vertical={false} />
            <Tooltip />
            <Line
              type="monotone"
              name="Fill"
              unit="%"
              dataKey="v"
              animationDuration={500}
              stroke="#00bf8d"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <style jsx>
        {`
          @keyframes Green {
            from {
              background-color: #00e8ac;
            }

            to {
              background-color: #00bf8d;
            }
          }

          @keyframes Red {
            from {
              background-color: #f78585;
            }

            to {
              background-color: #da6464;
            }
          }

          article {
            background: #ffffff;
            box-shadow: 4px 4px 35px rgba(0, 0, 0, 0.1);
            margin-bottom: 22px;

            .SensorItemCardFooter {
              padding: 40px 30px;

              > .chart-header {
                display: flex;
                margin-bottom: 30px;
                justify-content: space-between;

                h3 {
                  margin: 0;
                }

                .time-buttons {
                  font-size: 13px;
                  color: #003b2c;
                  > div {
                    display: inline-block;
                    margin-left: 15px;

                    &:hover {
                      color: #00bf8d;
                      text-decoration: underline;
                      cursor: pointer;
                    }
                  }
                  .active {
                    color: #00bf8d;
                    text-decoration: underline;
                  }
                }
              }

              .LineChart {
                width: 100%;
                height: 100%;
                margin: auto;
                display: block;
              }
            }

            .SensorItemCardContent {
              border-bottom: 2px solid rgba(216, 216, 216, 0.2);

              > div {
                padding: 20px 30px;
                display: flex;

                > div {
                  &:nth-child(1) {
                    flex: 1;
                  }

                  p,
                  h3,
                  h4,
                  h5,
                  h6 {
                    margin: 0;
                  }

                  p {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: normal;

                    color: #a0a0a0;
                  }

                  h3 {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 52px;
                    line-height: normal;

                    color: ${fill_percentage > 50 ? "#da6464" : "#00bf8d"};
                  }

                  h4,
                  h5,
                  h6 {
                    margin-top: 6px;
                  }

                  h4 {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 18px;
                    line-height: normal;
                    text-transform: uppercase;

                    color: #333333;

                    &.green {
                      color: #00bf8d;
                    }

                    &.red {
                      color: #da6464;
                    }
                  }

                  h5 {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: normal;

                    color: #a0a0a0;
                  }

                  h6 {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 12px;
                    line-height: normal;
                    text-transform: uppercase;

                    color: #a0a0a0;
                  }
                }
              }
            }

            .SensorItemCardHeader {
              border-bottom: 2px solid rgba(216, 216, 216, 0.2);

              > div {
                padding: 20px 30px;

                h2 {
                  margin: 0 0 10px 0;
                  color: #333333;
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: bold;
                  font-size: 26px;
                  line-height: normal;
                  text-decoration: none;
                }

                p {
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: normal;
                  font-size: 12px;
                  line-height: normal;
                  margin: 0;
                  color: #00bf8d;
                }

                span {
                  width: 12px;
                  height: 12px;
                  border-radius: 50%;
                  display: block;
                  float: right;

                  &.green {
                    animation: Green 1s infinite ease-in-out;
                    animation-direction: alternate;
                  }

                  &.red {
                    animation: Red 1s infinite ease-in-out;
                    animation-direction: alternate;
                  }
                }
              }
            }
          }
        `}
      </style>
    </article>
  );
};

SensorItemCardExpanded.propTypes = {
  sensor_id: PropTypes.string.isRequired,
  reports: PropTypes.array.isRequired,
  fill_percentage: PropTypes.number.isRequired,
  updated_on: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired
};

export default withTranslation("sensor")(SensorItemCardExpanded);
