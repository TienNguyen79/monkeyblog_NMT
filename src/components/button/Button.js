import React, { Children } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
const ButtonStyles = styled.button`
  cursor: pointer;

  /* padding: 10px 0; */
  height: ${(props) => props.height || "50px"};
  line-height: 1;

  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
      padding: 10px;
    `};
  border-radius: 8px;
  font-weight: 600;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  .loadingsvg {
    width: 40px;
    height: 40px;
    margin: 0 auto;
  }
`;

/**
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  ...props
}) => {
  const { isLoading, to } = props; //destructuring

  // !! convert sang kiểu boolean để trả về kiểu true or false thôi
  const child = !!isLoading ? (
    <img src="/Spin-1s-200px.svg" className="loadingsvg" alt="" />
  ) : (
    children
  );

  //button khi có prop to sẽ điều hướng trang được
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
