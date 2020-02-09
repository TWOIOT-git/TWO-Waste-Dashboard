import React from "react";
import PropTypes from "prop-types";
import Filters from "./Filters";
import Tag from "./Tag";

class TopTools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openFilters: false,
      tags: []
    };
  }

  onClickButtonLayout = () => {
    const {
      props: { layoutMode, onChangeLayout }
    } = this;

    onChangeLayout(layoutMode === "cards" ? "table" : "cards");
  };

  toggleFilters = () => {
    this.setState(state => {
      return { openFilters: !state.openFilters };
    });
  };

  render() {
    const {
      state: { openFilters, tags },
      props: { layoutMode },
      onClickButtonLayout,
      toggleFilters
    } = this;

    return (
      <div className="TopToolsWrapper">
        <div className="TopTools">
          {/*<div>*/}
          {/*  <label htmlFor="search">*/}
          {/*    <img src="/static/icons/search.png" alt="Search in lidbot" />*/}
          {/*    <input placeholder="Search for..." id="search" name="search" />*/}
          {/*    <If condition={openFilters}>*/}
          {/*      <div className="filterAbsolute">*/}
          {/*        <Filters />*/}
          {/*      </div>*/}
          {/*    </If>*/}
          {/*  </label>*/}
          {/*  /!*<button type="button" onClick={toggleFilters}>*!/*/}
          {/*  /!*  <img src="/static/icons/filter.png" alt="search in lidbot" />*!/*/}
          {/*  /!*</button>*!/*/}
          {/*</div>*/}
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
        </div>
        <div className="TopToolTags">
          <If condition={tags.length}>
            {tags.map(name => (
              <div key={name}>
                <Tag name={name} />
              </div>
            ))}
          </If>
        </div>
        <style jsx>{`
          .TopToolTags {
            display: flex;
            align-items: center;
            justify-content: center;

            > div {
              &:not(:last-child) {
                margin-right: 20px;
              }
            }
          }

          .TopTools {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;

            .filterAbsolute {
              position: absolute;
            }

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
                padding: 25px 15px;

                color: rgba(84, 84, 84, 0.5);
              }
            }
          }
        `}</style>
      </div>
    );
  }
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
