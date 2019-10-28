import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from '../i18n'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

const UserTable = ({ items, onDelete }) => {
  return (
    <div className="UserTable">
      <div className="UserTableHeader">
        <div></div>
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>Status</div>
        <div>Enabled</div>
        <div>Actions</div>
      </div>
      {items.map(
        ({
           given_name,
           family_name,
           src,
           email,
           enabled,
           user_status,
           user_role,
           t
        }) => (
          <div key={email} className="UserTableItem">
            <If condition={src}>
              <img src={src} />
            </If>
            <If condition={!src}>
              <div className="placeholder"></div>
            </If>
            <div className="name">{`${given_name} ${family_name}`}</div>
            <div className="detail">{email}</div>
            <div className="detail">{user_role}</div>
            <div className="detail">{user_status}</div>
            <div className="detail">{enabled ? 'enabled' : 'disabled'}</div>
            <div className="action">
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
                  <Dropdown.Item onClick={(e) => onDelete(e, email)}>Delete</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => onDelete(e, email)}>Disable</Dropdown.Item>
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

          .UserTable {
            flex: 1;
          }

          .UserTableHeader {
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

          .UserTableItem {
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

UserTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      user_role: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  t: PropTypes.func.isRequired

};

export default withTranslation('sensor')(UserTable)
