import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
const PostTitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  /* color: inherit; */
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 16px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};

  /* Mobile styles (<640px) */
  @media (max-width: 640px) {
    ${(props) =>
      props.size === "big" &&
      css`
        font-size: 16px;
      `};
  }
`;
const PostTitle = ({ children, className = "", size = "normal", to = "/" }) => {
  return (
    <PostTitleStyles className={className} size={size}>
      <Link
        to={`/${to}`}
        /* className="sm:text-[16px] md:text-[22px] lg:text-[22px]" */
      >
        {children}
      </Link>
    </PostTitleStyles>
  );
};

export default PostTitle;
