import { Spin } from "antd";
import React from "react";
import styled from "styled-components";

const Loading = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
`;

const LoadingComponent = () => {
  return (
    <Loading>
      <Spin />
    </Loading>
  );
};

export default LoadingComponent;
