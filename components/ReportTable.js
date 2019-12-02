import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from '../i18n'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

const ReportTable = ({
                     items,
                     onDelete,
  t
}) => {
  return (
    <div className="ReportTable">
      <div className="ReportTableHeader">
        <div>{t('created_on')}</div>
        <div>{t('fill_percentage')}</div>
        <div>{t('distance')}</div>
        <div>{t('temperature')}</div>
        <div>{t('battery')}</div>
        <div>{t('signal')}</div>
        <div>{t('actions')}</div>
      </div>
      {items.map(
        ({
           created_on,
            when,
           sensor_id,
           v,
           l,
           t,
           b,
           s
        }) => (
          <div key={`${sensor_id}-${created_on}`} className="ReportTableItem">
            <div className="detail">{when}</div>
            <div className="detail">{v}</div>
            <div className="detail">{l}</div>
            <div className="detail">{t}</div>
            <div className="detail">{b}</div>
            <div className="detail">{s}</div>
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
                  <Dropdown.Item onClick={(e) => onDelete(e, sensor_id, created_on)}>Delete</Dropdown.Item>
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

          .ReportTable {
            flex: 1;
          }

          .ReportTableHeader {
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

          .ReportTableItem {
            width: 100%;
            background: #ffffff;
            box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
            padding: 16px;
            margin-bottom: 6px;
            display: flex;
            align-items: center;

            > div:not(:first-child) {
              flex: 1;
            }

            > div:last-child {
              flex: 0.75
            }

            > div:first-child {
              flex: 0.75;
            }
            
            > img {
                  border: 1px solid #00b284;
                  border-radius: 50%;
                  width: 50px;
                  height: 50px;
                  margin-right: 15px;
                }
                > .placeholder {
                  border: 1px solid #00b284;
                  border-radius: 50%;
                  margin-right: 15px;
                  max-width: 50px;
                  width: 50px;
                  height: 50px;
                  background: #f6f6f6;
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

ReportTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      user_role: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  t: PropTypes.func.isRequired

};

export default withTranslation('sensor')(ReportTable)
