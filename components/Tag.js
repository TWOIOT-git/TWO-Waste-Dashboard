import React from "react";
import PropTypes from "prop-types";

const Tag = ({ name }) => {
  return (
    <div>
      <button type='button'>
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.353553"
            y1="0.646447"
            x2="11.6673"
            y2="11.9602"
            stroke="white"
          />
          <line
            x1="1.06051"
            y1="11.9602"
            x2="12.3742"
            y2="0.646459"
            stroke="white"
          />
        </svg>
      </button>
      <span>{name}</span>
      <style jsx>{`
        div {
          min-width: 108px;
          padding-right: 20px;
          height: 30px;
          background: #00bf8d;

          button {
            border: none;
            height: 100%;
            width: 31px;
            display: inline;
            justify-content: center;
            align-items: center;
            background: #00bf8d;
            cursor: pointer;
          }

          span {
            font-family: Roboto;
            font-style: normal;
            font-weight: bold;
            font-size: 12px;
            line-height: 14px;
            align-items: center;
            text-align: center;

            color: #ffffff;
          }
        }
      `}</style>
    </div>
  );
};

Tag.propTypes = {
  name: PropTypes.string.isRequired
};

export default Tag;
