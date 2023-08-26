import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  margin-left: auto;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
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
    .post-time.mobile {
      display: none;
    }
    .post-dot.mobile {
      /* display: none; */
    }
  }
`;
const PostMeta = ({
  date = "Mar 23",
  author = "Andiez Le",
  className = "",
  classNameMobile = "",
  classNameTablet = "",
  to = "/",
}) => {
  return (
    <PostMetaStyles>
      <span className={`post-time ${classNameMobile}`}>{date}</span>
      <span className={`post-dot ${classNameMobile}`}></span>
      <Link to={`/author/${to}`}>
        <span title={author} className={className}>
          {author}
        </span>
      </Link>
    </PostMetaStyles>
  );
};
export default PostMeta;
