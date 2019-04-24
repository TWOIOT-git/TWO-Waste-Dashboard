import React from "react";
import MenuNavegation from "../components/MenuNavegation";

export default WrappedComponent => {
  const Layout = ({ ...props }) => (
    <div className="LayoutFlex">
      <MenuNavegation
        userImage="https://www.brand-her.com/wp-content/uploads/2014/02/team1.jpg"
        userName="Carl"
      />
      <div className="Content">
        <WrappedComponent {...props} />
      </div>
      <style jsx>{`
        .LayoutFlex {
          display: flex;
        }

        .LayoutFlex > .Content {
          flex: 1;
        }
      `}</style>
    </div>
  );
  return Layout;
};
