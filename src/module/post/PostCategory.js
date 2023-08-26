import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
const PostCategoryStyles = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  margin-bottom: 10px;
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};

  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
  /* PC styles (>=1024px) */
  @media (min-width: 1024px) {
    /* PC styles */
  }

  /* Tablet styles (>=768px and <1024px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    /* Tablet styles */
  }

  /* Mobile styles (<640px) */
  @media (max-width: 640px) {
    /* Mobile styles */
    .category-content.mobile {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90px;
    }
  }
`;
const PostCategory = ({
  children,
  type = "primary",
  className = "",
  to = "",
  title = "",
  classNameMobile = "",
}) => {
  return (
    <PostCategoryStyles type={type}>
      <Link to={`/category/${to}`} title={title}>
        <span className={`category-content ${classNameMobile} ${className}`}>
          {children}
        </span>
      </Link>
    </PostCategoryStyles>
  );
};

export default PostCategory;
