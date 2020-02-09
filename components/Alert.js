import PropTypes from "prop-types";


const Alert = ({ error }) => (
  <If condition={error}>
    <div className="alert">
      <div className="circle"></div>
      <div className="message">
        <div className="code">{error.code}</div>
        <div className="details">{error.message}</div>
      </div>
    </div>
    <style jsx>
      {`
        .alert {
          background: #FFFFFF;
          box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #DA6464;
          display: flex;

          > .circle {
            width: 36px;
            height: 36px;
            background: #DA6464;
            border-radius: 50%;
          }
          > .message {
            padding-left: 20px;

            > .code {
              font-family: Roboto;
              font-style: normal;
              font-weight: bold;
              font-size: 16px;
              line-height: 19px;
              color: #333333;
            }
            > .details {
              font-family: Roboto;
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 14px;
              color: #000000;
              opacity: 0.5;
            }
          }
        }
        `
      }
    </style>
  </If>
);


Alert.propTypes = {
  error: PropTypes.object,
}

export default Alert
