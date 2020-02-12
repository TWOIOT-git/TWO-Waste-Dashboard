import React from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { withTranslation } from '../i18n'
import moment from "moment"
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

const SensorItemCardExpanded = ({
                                  sensor_id,
                                  customer_id,
                                  fill_percentage,
                                  reports,
                                  bin_type,
                                  bin_location,
                                  updated_on,
                                  min_distance,
                                  max_distance,
                                  latitude,
                                  longitude,
                                  volume,
                                  nickname,
                                  schedule,
                                  next_report,
                                  firmware_version,
                                  battery,
                                  signal_strength,
                                  temperature,
                                  t,
                                  active,
                                  onClick,
                                  onDelete,
                                  onEdit,
                                  onDeleteAllEvents,
                                  onDeleteAllReports,
}) => {
  return (
    <article>
      <div className="SensorItemCardHeader">
        <div>
          <span className={`status ${fill_percentage <= 75 ? "green" : "red"}`} />
          <div className="actions">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
              >
                <svg height="20" width="30">
                  <circle cx="4" cy="10" r="3" fill="rgb(0,191,141)" />
                  <circle cx="14" cy="10" r="3" fill="rgb(0,191,141)" />
                  <circle cx="24" cy="10" r="3" fill="rgb(0,191,141)" />
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => onDelete(e)}>Delete Sensor</Dropdown.Item>
                <Dropdown.Item onClick={(e) => onDeleteAllReports(e, sensor_id)}>{t('delete-reports')}</Dropdown.Item>
                <Dropdown.Item onClick={(e) => onDeleteAllEvents(e, customer_id, sensor_id)}>{t('delete-events')}</Dropdown.Item>
                <Dropdown.Item onClick={(e) => onEdit(e)}>{t('edit-sensor')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <h2>
            <If condition={nickname}>
              {nickname} ({sensor_id})
            </If>
            <If condition={!nickname}>
              {sensor_id}
            </If>
          </h2>
          <p>Volume: {volume} m3</p>
          <p>Runs every: {(schedule / 3600).toFixed(2)} hour(s)</p>
          <If condition={moment.unix(next_report).isBefore(moment())}>
            <p className="red">Next report: {moment.unix(next_report).fromNow()}</p>
          </If>
          <If condition={!moment.unix(next_report).isBefore(moment())}>
            <p className="green">Next report: {moment.unix(next_report).fromNow()}</p>
          </If>
        </div>
      </div>
      <div className="SensorItemCardContent">
        <div>
          <div>
            <p>{t('status')}:</p>
            <If condition={!isNaN(fill_percentage)}>
              <h3>{Math.round(fill_percentage)}%</h3>
            </If>
            <h5>{moment.unix(updated_on).fromNow()}</h5>
          </div>
          <div>
            <If condition={bin_location}>
              <p>{t('location')}:</p>
              <h4>{bin_location}</h4>
            </If>
            <p>{t('battery')}:</p>
            <h4 className={`status ${battery > 20 ? "green" : "red"}`}>{battery}%</h4>
            <If condition={temperature}>
              <p>{t('temperature')}:</p>
              <h4>{temperature}°C</h4>
            </If>
            <p>{t('signal')}:</p>
            <h4>{signal_strength}</h4>
          </div>
        </div>
      </div>
      <div className="SensorItemCardFooter">
        <div className="chart-header">
          <h3>{t('fill-level')}</h3>
          <div className="time-buttons">
            <div onClick={() => onClick('6')} className={active === '6' ? 'active' : ''}>6 {t('hour')}</div>
            <div onClick={() => onClick('12')} className={active === '12' ? 'active' : ''}>12 {t('hour')}</div>
            <div onClick={() => onClick('24')} className={active === '24' ? 'active' : ''}>1 {t('day')}</div>
            <div onClick={() => onClick('72')} className={active === '72' ? 'active' : ''}>3 {t('days')}</div>
            <div onClick={() => onClick('168')} className={active === '168' ? 'active' : ''}>1 {t('week')}</div>
            <div onClick={() => onClick('336')} className={active === '336' ? 'active' : ''}>{t('2-week')}</div>
            <div onClick={() => onClick('672')} className={active === '672' ? 'active' : ''}>{t('4-week')}</div>
            <div onClick={() => onClick('672')} className={active === '2160' ? 'active' : ''}>{t('3-months')}</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
        <LineChart data={reports.slice().reverse()}
                   margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="t"
            padding={{ left: 20, right: 20 }}
          />
          <YAxis/>
          <CartesianGrid tickCount="3" vertical={false}/>
          <Tooltip

          />
          <Line
            type="monotone"
            name="Fill"
            unit="%"
            dataKey="v"
            animationDuration={500}
            stroke="#00bf8d"
            dot={false}
            activeDot={{r: 5}}
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
                  color: #003B2C;
                  > div {
                    display: inline-block;
                    margin-left: 15px;

                    &:hover {
                      color: #00BF8D;
                      text-decoration: underline;
                      cursor: pointer;
                    }
                  }
                  .active {
                    color: #00BF8D;
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

                    color: ${fill_percentage > 75 ? "#da6464" : "#00bf8d"};
                  }

                  h4,
                  h5,
                  h6 {
                    margin: 5px 0 8px 0;
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

              .actions {
                float: right;
              }
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

                  &.red {
                    color: #da6464;
                  }
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
  fill_percentage: PropTypes.number,
  updated_on: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('sensor')(SensorItemCardExpanded)
