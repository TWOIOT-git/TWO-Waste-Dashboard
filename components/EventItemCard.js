import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import moment from "moment";
import { withTranslation } from '../i18n'

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

const EventItemCard = ({
                          sensor_id,
                          type,
                          message,
                          report_created_on,
                          t
}) => {
  return (
    <article>
      <div className="SensorItemCardHeader">
        <div>
          <h2>
            <Link href={{ pathname: '/sensor', query: { id: sensor_id } }} as={`/sensor/${sensor_id}`}>
              <a>{sensor_id}</a>
            </Link>
          </h2>
          <p>{message}</p>
        </div>
      </div>
      <div className="SensorItemCardContent">
        <div>
          <div>
            <h5>{moment.unix(report_created_on).fromNow()}</h5>
          </div>
        </div>
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
              padding: 14px 30px;
              display: flex;
              justify-content: space-between;

              .BarChart {
                  width: 100%;
                  height: 50%;
                  margin: auto;
                  display: block;
                }

              > div {
                p {
                  margin: 0;
                }

                &:nth-child(1) {
                  p {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: normal;

                    color: #a0a0a0;
                  }
                }

                &:nth-child(2) {
                  p {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 12px;
                    line-height: normal;
                    text-align: right;

                    color: #a0a0a0;
                  }
                }
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
                    font-size: 42px;
                    line-height: normal;

                    color: #00bf8d;
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
                  margin: 0;

                  a {
                    color: #333333;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 20px;
                    line-height: normal;
                    text-decoration: none;

                    &:hover {
                      color: #00bf8d;
                    }
                  }
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

EventItemCard.propTypes = {
  sensor_id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('sensor')(EventItemCard)
