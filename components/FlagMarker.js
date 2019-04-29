import React from "react";
import PropTypes from "prop-types";

const FlagMarker = ({ name, eta, porcentage }) => {
  return (
    <div className="FlagMarker">
      <div className="porcentageBlock">
        <span>{porcentage}%</span>
      </div>
      <div>
        <span>{name}</span>
        <span>{eta}</span>
      </div>
      <svg
        width="46"
        height="39"
        viewBox="0 0 46 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="picker"
      >
        <g filter="url(#filter0_d)">
          <path d="M20.5294 22L13 13H29L20.5294 22Z" fill="white" />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="0"
            y="0"
            width="46"
            height="39"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="7.5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        .FlagMarker {
          min-width: 95px;
          padding-right: 10px;
          height: 40px;
          background: white;
          box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
          border-left: 2px solid ${porcentage > 50 ? "#DA6464" : "#00BF8D"};
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          svg.picker {
            z-index: 1;
            position: absolute;
            left: 30%;
            bottom: -25px;
          }

          > div {
            display: flex;
            justify-content: center;
            align-items: center;

            &:nth-child(1) {
              margin-right: 10px;
              margin-left: 5px;

              span {
                font-family: Roboto;
                font-style: normal;
                font-weight: bold;
                font-size: 16px;
                line-height: 19px;
                display: flex;
                align-items: center;
                color: ${porcentage > 50 ? "#DA6464" : "#00BF8D"};
              }
            }

            &:nth-child(2) {
              flex-direction: column;
              align-items: start;

              > span {
                &:nth-child(1) {
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: normal;
                  font-size: 12px;
                  line-height: 14px;
                  display: flex;
                  align-items: center;

                  color: #00bf8d;
                }

                &:nth-child(2) {
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: normal;
                  font-size: 8px;
                  line-height: 9px;
                  display: flex;
                  align-items: center;

                  color: #007255;

                  opacity: 0.7;
                }
              }
            }
          }
        }
      `}</style>
    </div>
  );
};

FlagMarker.propTypes = {
  name: PropTypes.string.isRequired,
  eta: PropTypes.string.isRequired,
  porcentage: PropTypes.number.isRequired
};

export default FlagMarker
