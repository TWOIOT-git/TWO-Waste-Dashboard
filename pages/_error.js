import React from "react";
import withMenuNavegation from "../hoc/withMenuNavegation";

const ErrorPage = () => {
  return (
    <div>
      <h1>
        <span style={{ color: "#da6464" }}>Error</span>
        <span>.</span>
      </h1>
      <style jsx>{`
        @keyframes Enter {
          from {
            -webkit-transform: translateX(-28px);
            opacity: 0;
          }
          to {
            -webkit-transform: none;
            opacity: 1;
          }
        }

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        h1 {
          font-size: 3.5rem;
          color: #2b2b2b;
          animation: Enter 0.5s forwards;

          span {
            color: #00cd98;
          }
        }
      `}</style>
    </div>
  );
};

export default withMenuNavegation(ErrorPage);