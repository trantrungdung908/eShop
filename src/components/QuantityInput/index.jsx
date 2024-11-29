import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";

const InputNumberStyle = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const QuantityInput = (
  { max, step = 1, min = 1, defaultValue = 1, onChange, ...inputProps },
  ref
) => {
  const [currentQuantity, setCurrentQuantity] = useState(defaultValue);

  useEffect(() => {
    onChange?.(currentQuantity);
  }, [currentQuantity]);

  useImperativeHandle(ref, () => {
    return {
      value: currentQuantity,
      reset: () => {
        setCurrentQuantity(defaultValue ?? 1);
      },
    };
  });

  const _onChangeQuantityInput = (e) => {
    e?.stopPropagation();
    setCurrentQuantity(e.target.value);
  };

  // onBlur -> out focus input
  const _onInputBlur = () => {
    if (currentQuantity === "") {
      setCurrentQuantity(defaultValue);
    }
  };

  const _onIncrease = () => {
    const value = _modifyValue(Number(currentQuantity) + Number(step));
    setCurrentQuantity(value);
  };

  const _onDecrease = () => {
    const value = _modifyValue(Number(currentQuantity) - Number(step));
    setCurrentQuantity(value);
  };

  const _modifyValue = (value) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  };

  return (
    <div className="product-details-quantity">
      <div className="input-group input-spinner">
        <div className="input-group-prepend">
          <button
            className="btn btn-decrement btn-spinner"
            onClick={_onDecrease}
          >
            <i className="icon-minus"></i>
          </button>
        </div>
        <InputNumberStyle
          type="number"
          id="qty"
          className="form-control"
          value={currentQuantity}
          min={min}
          max={max}
          step={step}
          onChange={(e) => _onChangeQuantityInput(e)}
          onBlur={_onInputBlur}
          {...inputProps}
        />
        <div className="input-group-append">
          <button
            onClick={_onIncrease}
            className="btn btn-increment btn-spinner"
            style={{ minWidth: 26 }}
          >
            <i className="icon-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(QuantityInput);
