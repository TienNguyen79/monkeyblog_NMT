import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import IconEyeOpen from "../icon/IconEyeOpen";
import IconEyeClose from "../icon/IconEyeClose";

const InputStyles = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    /* padding: 20px 25px; */
    padding: ${(props) =>
      props.hasIcon
        ? "20px 60px 15px 20px"
        : "15px"}; //cách cho chữ không dính vào mắt
    border: 1px solid ${(props) => props.theme.grayLight};
    margin-top: 15px;
    margin-bottom: 20px;
    border-radius: 4px;
    font-weight: 500;
    background-color: ${(props) => props.theme.grayLight};
    transition: all 0.2s linear;
    font-size: 16px;
  }
  input:focus {
    border: 1px solid ${(props) => props.theme.primary};
    background-color: white;
  }
  .input-icon {
    position: absolute;
    /* top: 0; */
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const Input = ({ name = "", type = "text", children, control, ...props }) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children}
    </InputStyles>
  );
};

export default Input;
