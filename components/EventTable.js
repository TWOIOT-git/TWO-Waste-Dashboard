import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from '../i18n'
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventTable = ({
                      items,
                      onDelete,
                      t
}) => {
  return (
    <div className="EventTable">
      <If condition={items.length !== 0}>
      <div className="EventTableHeader">
        {/*<div>{t('subscriptions')}</div>*/}
        {/*<div>{t('trigger')}</div>*/}
        <div>{t('created-on')}</div>
        <div>{t('type')}</div>
        {/*<div>{t('message')}</div>*/}
        <div>{t('actions')}</div>
      </div>
      {
        items.map(
        ({
           customer_id,
           event_id,
           type,
           message,
           created_on
        }) => (
          <div key={event_id} className="EventTableItem">
            {/*<div className="detail">Andrzej</div>*/}
            {/*<div className="detail">Report</div>*/}
            <div className="detail">{moment.unix(created_on).format('LLL')}</div>
            <div className="detail">{t(type)}</div>
            {/*<div className="detail">{message}</div>*/}
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
                  <Dropdown.Item onClick={(e) => onDelete(e, customer_id, event_id)}>{t('delete')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        )
      )
      }
      </If>
      <If condition={items.length === 0}>
        <div className="no-events">{t('no-events')}</div>
      </If>

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

          .no-events {
            text-align: center;
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
