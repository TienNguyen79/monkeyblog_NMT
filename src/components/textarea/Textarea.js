import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import IconEyeOpen from "../icon/IconEyeOpen";
import IconEyeClose from "../icon/IconEyeClose";

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;

  textarea {
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
    resize: none;
    min-height: 150px;
  }
  textarea:focus {
    border: 1px solid ${(props) => props.theme.primary};
    background-color: white;
  }
`;
const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <TextareaStyles hasIcon={children ? true : false}>
      <textarea id={name} type={type} {...field} {...props} />
      {children}
    </TextareaStyles>
  );
};

export default Textarea;
