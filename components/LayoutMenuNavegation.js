import React from "react";
import PropTypes from "prop-types";
import MenuNavegation from "./MenuNavegation";

const LayoutMenuNavegation = ({ children }) => (
  <div className="LayoutFlex">
    <MenuNavegation
      userImage="https://www.brand-her.com/wp-content/uploads/2014/02/team1.jpg"
      userName="Carl"
    />
    <div className="Content">{children}</div>
    <style jsx>{`
      .LayoutFlex {
        display: flex;
      }

      .LayoutFlex > .Content {
        flex: 1;
        padding-left: 200px;
      }
    `}</style>
  </div>
);

LayoutMenuNavegation.propTypes = {
  children: PropTypes.node.isRequired
};

export default LayoutMenuNavegation;
