import React, { useEffect, useState } from "react";

const useDebounce = (value, delayTime) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayTime);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delayTime]);

  return debouncedValue;
};

export default useDebounce;
