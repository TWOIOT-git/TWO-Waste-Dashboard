import React from "react";
import PropTypes from "prop-types";
import Select from 'react-select';
import { withTranslation } from '../i18n'

const SelectItem = (
  { label,
    value,
    options,
    disabled,
    onChange,
  }
  ) => {
  return (
    <div className="SelectItem">
      <div>
        <span className={`label ${disabled ? 'disabled' : 'enabled'}`}>{label}</span>
      </div>
      <div>
        <Select
          value={value}
          onChange={onChange}
          options={options}
        />
      </div>
      <style jsx>
        {`
          .SelectItem {
            width: 100%;
            max-width: 700px;
            margin-bottom: 40px;
            align-items: center;
            justify-content: space-between;

            .label {
              display: block;
              font-family: Roboto;
              font-style: normal;
              font-weight: 500;
              font-size: 16px;
              line-height: 19px;
              color: #333333;
              padding-bottom: 8px;
              
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

SelectItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectItem
