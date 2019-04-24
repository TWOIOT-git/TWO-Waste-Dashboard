import React from "react";
import PropTypes from "prop-types";

const SensorTable = ({ items }) => {
  return (
    <div className="SensorTable">
      <div className="SensorTableHeader">
        <div>Status</div>
        <div>Name</div>
        <div>Unit</div>
        <div>City</div>
        <div>Placed</div>
        <div>Address</div>
        <div>Company</div>
      </div>
      {items.map(
        ({
          name,
          robinSize,
          status,
          porcentage,
          location: { city, street, outIn },
          owner,
          id
        }) => (
          <div key={id} className="SensorTableItem">
            <div className="status">
              <span
                className={`circle ${status === "no-full" ? "green" : "red"}`}
              />
              <span style={{ color: porcentage > 50 ? "#da6464" : "#00bf8d" }}>
                {porcentage}%
              </span>
            </div>
            <div className="name">{name}</div>
            <div className="detail --upper">{robinSize}</div>
            <div className="detail">{city}</div>
            <div className="detail --capital">{outIn}</div>
            <div className="detail">{street}</div>
            <div className="detail --light">{owner.name}</div>
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
              flex: 0.4;
            }

            > div:first-child {
              flex: 0.3;
            }
          }

          .SensorTableItem {
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
              flex: 0.4;
            }

            > div:first-child {
              flex: 0.3;
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
      name: PropTypes.string.isRequired,
      robinSize: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      porcentage: PropTypes.string.isRequired,
      location: PropTypes.shape({
        city: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        outIn: PropTypes.string.isRequired
      }).isRequired,
      owner: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
};

export default SensorTable;
