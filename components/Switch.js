import React from "react";
import PropTypes from "prop-types";

const Active = () => (
  <svg
    width="30"
    height="15"
    viewBox="0 0 30 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="30" height="15" fill="#00BF8D" filter="url(#filter0_i)" />
    <rect x="16.25" y="1.25" width="12.5" height="12.5" fill="#fff" />
    <defs>
      <filter
        id="filter0_i"
        x="0"
        y="0"
        width="31"
        height="16"
        filterUnits="userSpaceOnUse"
      >
        <feFlood result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
        <feBlend in2="shape" result="effect1_innerShadow" />
      </filter>
    </defs>
  </svg>
);

const Desactived = () => (
  <svg
    width="30"
    height="15"
    viewBox="0 0 30 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="30" height="15" fill="#E0E0E0" filter="url(#filter0_i)" />
    <rect x="1.25" y="1.25" width="12.5" height="12.5" fill="#fff" />
    <defs>
      <filter
        id="filter0_i"
        x="0"
        y="0"
        width="31"
        height="16"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
        <feBlend in2="shape" result="effect1_innerShadow" />
      </filter>
    </defs>
  </svg>
);

const Switch = ({ active }) => {
  return (
    <button type="button">
      <If condition={active}>
        <Active />
      </If>
      <If condition={!active}>
        <Desactived />
      </If>
      <style jsx>{`
        button {
          padding: 0;
          margin: 0;
          border: none;
          background: none;
          cursor: pointer;
        }
      `}</style>
    </button>
  );
};

Switch.propTypes = {
  active: PropTypes.bool.isRequired
};

export default Switch;
