import React from "react";
import PropTypes from "prop-types";
import MenuNavegation from "./MenuNavegation";
import breakpoints from "../utils/breakpoints";
import { ClientContext } from '../utils/auth'

class LayoutMenuNavegation extends React.Component {
  static contextType = ClientContext;
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  toggleShow = () => {
    this.setState(state => {
      return { show: !state.show };
    });
  };

  render() {
    const {
      state: { show },
      props: { children },
      toggleShow
    } = this;
    return (
      <div className="LayoutFlex">
        <MenuNavegation
          userImage={this.context.user.attributes['picture']}
          userName={this.context.user.attributes['given_name']}
          show={show}
        />
        <button className="burger" type="button" onClick={toggleShow}>
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H12" stroke="white" />
            <path d="M0 5H12" stroke="white" />
            <path d="M0 9H12" stroke="white" />
          </svg>
        </button>
        <If condition={show}>
          <div
            className="Overlay"
            onClick={toggleShow}
            role="button"
            tabIndex="0"
            onKeyPress={toggleShow}
          />
        </If>
        <div className="Content">{children}</div>
        <style jsx>{`
          .LayoutFlex {
            display: flex;
          }

          .LayoutFlex .Overlay {
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 100;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 11;
          }

          .LayoutFlex > .Content {
            flex: 1;
            padding-left: 200px;
          }

          .LayoutFlex .burger {
            display: none;
          }

          @media (max-width: ${breakpoints.tablet}) {
            .LayoutFlex > .Content {
              flex: 1;
              padding-left: 0;
              width: 100%;
            }

            .LayoutFlex .burger {
              display: inline;
              position: fixed;
              left: 30px;
              top: 30px;
              z-index: 12;
              background: none;
              border: none;
              padding: 0;
              transform: scale(2, 2);
            }
          }
        `}</style>
      </div>
    );
  }
}
LayoutMenuNavegation.propTypes = {
  children: PropTypes.node.isRequired
};

export default LayoutMenuNavegation;
