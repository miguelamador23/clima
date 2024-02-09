import React from "react";

const LocationPermissionButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Request Location Permission
    </button>
  );
};

export default LocationPermissionButton;