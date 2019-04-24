import React from "react";
import PropTypes from "prop-types";

const SensorItemCard = ({ name, robinSize, status, porcentage }) => {
  return (
    <div>
      <h1>{`${name}, ${robinSize}, ${status}, ${porcentage}`}</h1>
      <style jsx>
        {`
          div {
            background: #ffffff;
            box-shadow: 4px 4px 35px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
};

SensorItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  robinSize: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  porcentage: PropTypes.number.isRequired,
  location: PropTypes.shape({
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    out_in: PropTypes.string.isRequired
  }).isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default SensorItemCard;
