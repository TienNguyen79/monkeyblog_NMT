import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "slugify";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-info {
      display: flex;
      /* align-items: center; */
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #6b6b6b;
      margin-top: auto;
      /* width: 100%; */
    }

    &-title {
      margin-bottom: 8px;
    }
  }
  a {
    display: block;
    width: 100%;
    list-style: none;
  }
`;

const PostItem = ({ data }) => {
  return (
    <PostItemStyles>
      <PostImage
        url={data?.image}
        alt=""
        to={data?.slug}
        className="post-image"
      ></PostImage>

      {/* <div className="post-category">Kiến thức</div> */}
      <PostCategory className="post-category" to={data?.category?.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={data?.slug} className="post-title">
        {data?.title}
      </PostTitle>
      <div className="post-info">
        <PostMeta
          className="block whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[100px]"
          to={slugify(data?.user?.username || "", { lower: true })}
          date={
            new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
              "vi-VI"
            ) || new Date()
          }
          author={data?.user?.fullname}
        ></PostMeta>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
