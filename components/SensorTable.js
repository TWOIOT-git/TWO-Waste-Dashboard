import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from '../i18n'
import Link from "next/link";
import moment from "moment";

const SensorTable = ({ items }) => {
  return (
    <div className="SensorTable">
      <div className="SensorTableHeader">
        <div>Status</div>
        <div>Id</div>
        <div>Type</div>
        <div>Location</div>
        <div>Updated</div>
      </div>
      {items.map(
        ({
           sensor_id,
           fill_percentage,
           bin_type,
           bin_location,
           updated_on,
           t
        }) => (
          <Link href={{ pathname: '/sensor', query: { id: sensor_id } }} as={`/sensor/${sensor_id}`}>
          <div key={sensor_id} className="SensorTableItem">
            <div className="status">
              <span
                className={`circle ${status === "no-full" ? "green" : "red"}`}
              />
              <span style={{ color: fill_percentage > 50 ? "#da6464" : "#00bf8d" }}>
                {fill_percentage}%
              </span>
            </div>
            <div className="name">{sensor_id}</div>
            <div className="detail">{bin_type}</div>
            <div className="detail">{bin_location}</div>
            <div className="detail">{moment(updated_on).fromNow()}</div>
          </div>
          </Link>
        )
      )}

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

          .SensorTable {
            flex: 1;
          }

          .SensorTableHeader {
            width: 100%;
            padding: 16px;
            margin-bottom: 6px;
            display: flex;

            > div {
              font-style: normal;
              font-weight: normal;
              font-size: 16px;
              line-height: normal;

              color: #969696;
            }

            > div:not(:first-child) {
              flex: 1;
            }

            > div:last-child {
              flex: 0.75
            }

            > div:first-child {
              flex: 0.75;
            }
          }

          .SensorTableItem {
            cursor: pointer;
            width: 100%;
            background: #ffffff;
            box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
            padding: 16px;
            margin-bottom: 6px;
            display: flex;

            > div:not(:first-child) {
              flex: 1;
            }

            > div:last-child {
              flex: 0.75
            }

            > div:first-child {
              flex: 0.75;
            }

            .status {
              > .circle {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 12px;

                &.green {
                  animation: Green 1s infinite ease-in-out;
                  animation-direction: alternate;
                }

                &.red {
                  animation: Red 1s infinite ease-in-out;
                  animation-direction: alternate;
                }
              }

              > span:nth-child(2) {
                display: inline-block;
                font-family: Roboto;
                font-style: normal;
                font-weight: bold;
                font-size: 16px;
                line-height: normal;
                text-align: right;
              }
            }

            .name {
              font-family: Roboto;
              font-style: normal;
              font-weight: bold;
              font-size: 16px;
              line-height: normal;

              color: #333333;
            }

            .detail {
              font-family: Roboto;
              font-style: normal;
              font-weight: normal;
              font-size: 16px;
              line-height: normal;

              color: #333333;

              &.--capital {
                text-transform: capitalize;
              }

              &.--upper {
                text-transform: uppercase;
              }

              &.--light {
                color: #a0a0a0;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

SensorTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      sensor_id: PropTypes.string.isRequired,
      fill_percentage: PropTypes.number.isRequired,
      updated_on: PropTypes.number.isRequired,
      t: PropTypes.func.isRequired
    }).isRequired
  ).isRequired
};

export default withTranslation('sensor')(SensorTable)
