import React from "react";

const Checkbox = ({ label, id, checked, ...restProps }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        {...restProps}
        checked={checked}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
