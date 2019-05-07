import React from "react";
import PropTypes from "prop-types";
import Switch from "./Switch";

const SwitchItem = ({ title, description, active }) => {
  return (
    <div className="SwitchItem">
      <div>
        <span className="title">{title}</span>
        <span className="description">{description}</span>
      </div>
      <div>
        <Switch active={active} />
      </div>
      <style jsx>
        {`
          .SwitchItem {
            width: 100%;
            max-width: 400px;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .description {
              font-family: Roboto;
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 14px;
              color: #000000;
              opacity: 0.5;
              display: block;
            }

            .title {
              display: block;
              font-family: Roboto;
              font-style: normal;
              font-weight: bold;
              font-size: 16px;
              line-height: 19px;
              color: #333333;
            }
          }
        `}
      </style>
    </div>
  );
};

SwitchItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default SwitchItem;
