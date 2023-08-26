import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "slugify";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }

    &-title {
      margin-bottom: 12px;
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  return (
    <PostNewestLargeStyles>
      <PostImage
        url={data?.image}
        to={data?.slug}
        alt=""
        className="post-image"
      ></PostImage>
      <PostCategory className="post-category" to={data?.category.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={data?.slug} size="big" className="post-title">
        {data?.title}
      </PostTitle>
      <PostMeta
        to={slugify(data?.user?.username || "", { lower: true })}
        date={
          new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
            "vi-VI"
          ) || new Date()
        }
        author={data?.user?.fullname}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
