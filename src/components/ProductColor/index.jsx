import React, { forwardRef, useImperativeHandle, useState } from "react";

const ProductColor = ({ colors }, ref) => {
  const [selectedColor, setSelectedColor] = useState("");
  const _onChangeColor = (e, color) => {
    e?.stopPropagation();
    setSelectedColor(color);
  };

  useImperativeHandle(ref, () => {
    return {
      value: selectedColor,
      reset: () => {
        setSelectedColor("");
      },
    };
  });

  return (
    <div className="product-nav product-nav-dots">
      {colors?.map((item, index) => {
        return (
          <div
            key={item + index}
            onClick={(e) => _onChangeColor(e, item)}
            className={`product-nav-item ${
              selectedColor === item ? "active" : ""
            } `}
            style={{ background: `${item}` }}
          >
            <span className="sr-only">{item}</span>
          </div>
        );
      })}
    </div>
  );
};

export default forwardRef(ProductColor);
