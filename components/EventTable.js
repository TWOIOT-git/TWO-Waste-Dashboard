import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from '../i18n'
import Link from "next/link";
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';

const EventTable = ({ items, onDelete }) => {
  return (
    <div className="EventTable">
      <div className="EventTableHeader">
        <div>Id</div>
        <div>Type</div>
        <div>Message</div>
        <div>Happened</div>
        <div>Actions</div>
      </div>
      {items.map(
        ({
           sensor_id,
           event_id,
           type,
           message,
           report_created_on,
           t
        }) => (
          <div key={`${sensor_id}-${report_created_on}-${type}`} className="EventTableItem">
            <div className="name">{sensor_id}</div>
            <div className="detail">{type}</div>
            <div className="detail">{message}</div>
            <div className="detail">{moment.unix(report_created_on).fromNow()}</div>
            <div className="action">
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <svg height="20" width="30">
                    <circle cx="4" cy="10" r="3" fill="rgb(0,191,141)" />
                    <circle cx="14" cy="10" r="3" fill="rgb(0,191,141)" />
                    <circle cx="24" cy="10" r="3" fill="rgb(0,191,141)" />
                  </svg>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={(e) => onDelete(e, event_id)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
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

          .EventTable {
            flex: 1;
          }

          .EventTableHeader {
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

          .EventTableItem {
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

            .action {
              cursor: pointer;
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

EventTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      sensor_id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  t: PropTypes.func.isRequired
};

export default withTranslation('sensor')(EventTable)
