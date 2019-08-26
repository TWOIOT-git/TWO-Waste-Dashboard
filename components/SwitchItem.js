import React from "react";
import PropTypes from "prop-types";
import Switch from "./Switch";

const SwitchItem = (
  { title,
    description,
    active,
    disabled,
    onClick,
  }
  ) => {
  return (
    <div className="SwitchItem">
      <div>
        <span className={`title ${disabled ? 'disabled' : 'enabled'}`}>{title}</span>
        <span className={`description ${disabled ? 'disabled' : 'enabled'}`}>{description}</span>
      </div>
      <div>
        <Switch
          active={active}
          disabled={disabled}
          onClick={onClick}
        />
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
              
              
              &.disabled {
                color: red;
              }
            }

            .title {
              display: block;
              font-family: Roboto;
              font-style: normal;
              font-weight: bold;
              font-size: 16px;
              line-height: 19px;
              color: #333333;
              margin-bottom: 3px;
              
              &.disabled {
                color: #aaa;
              }
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
