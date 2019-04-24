import React from "react";
import PropTypes from "prop-types";

function TopTools({ layoutMode, onChangeLayout }) {
  const onClickButtonLayout = () => {
    const newValue = layoutMode === "cards" ? "table" : "cards";
    onChangeLayout(newValue);
  };

  return (
    <div className="TopTools">
      <div>
        <label htmlFor="search">
          <img src="/static/icons/search.png" alt="search in lidbot" />
          <input placeholder="Search for..." id="search" name="search" />
        </label>
        <button type="button">
          <img src="/static/icons/filter.png" alt="search in lidbot" />
        </button>
      </div>
      <If condition={layoutMode}>
        <button
          className="layoutButton"
          type="button"
          onClick={onClickButtonLayout}
        >
          <img
            src={`/static/icons/${
              layoutMode === "cards" ? "cardMode" : "tableMode"
            }.png`}
            alt="layout in lidbot"
          />
        </button>
      </If>
      <style jsx>{`
        .TopTools {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;

          .layoutButton {
            border: none;
            background: none;
            padding: 0;
            position: absolute;
            right: 30px;
            cursor: pointer;
          }

          > div {
            button {
              border: none;
              background: none;
              padding: 0;
              position: relative;
              right: 20px;
              cursor: pointer;
            }

            label {
              cursor: pointer;

              > img {
                margin-right: 14px;
              }
            }

            input {
              width: 343px;
              border: none;
              background: none;
              height: 24px;
              border-bottom: 1px solid #bbb6b6;
              font-family: Roboto;
              font-style: normal;
              font-weight: normal;
              font-size: 16px;
              line-height: normal;

              color: rgba(84, 84, 84, 0.5);
            }
          }
        }
      `}</style>
    </div>
  );
}

TopTools.defaultProps = {
  layoutMode: "",
  onChangeLayout: () => null
};

TopTools.propTypes = {
  layoutMode: PropTypes.string,
  onChangeLayout: PropTypes.func
};

export default TopTools;
