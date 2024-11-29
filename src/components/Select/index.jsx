import React from "react";

const Select = ({ options, error, ...restProps }) => {
  return (
    <select
      {...restProps}
      className={`form-control ${error ? "formerror" : ""}`}
    >
      {options?.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option?.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
