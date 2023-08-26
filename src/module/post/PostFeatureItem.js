import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import slugify from "slugify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 22px;
      color: white;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  /* Tablet styles (>=768px and <1024px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    /* Tablet styles */
    .post-top {
      display: block;
    }
  }

  /* Mobile styles (<640px) */
  @media (max-width: 640px) {
    .post-top {
      display: block;
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  // const [category, setCategory] = useState("");
  // const [user, setUser] = useState("");
  // useEffect(() => {
  //   async function fetch() {
  //     const docRef = doc(db, "categories", data.categoryId);
  //     const docSnap = await getDoc(docRef);
  //     setCategory(docSnap.data());
  //   }
  //   fetch();
  // }, [data.categoryId]);

  // useEffect(() => {
  //   async function fetchUser() {
  //     if (data.userId) {
  //       const docRef = doc(db, "users", data.userId);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.data) {
  //         setUser(docSnap.data());
  //       }
  //     }
  //   }
  //   fetchUser();
  // }, [data.userId]);

  const { category, user } = data;
  if (!data || !data.id) return null;
  //format date
  const date = data?.createAt?.seconds
    ? new Date(data?.createAt?.seconds * 1000) //chuyển định dạng giây về đối tượng date
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI"); //chuyển về quy tắc tiếng Việt

  return (
    <PostFeatureItemStyles>
      <PostImage
        url={data.image}
        to={data?.slug}
        className="post-image"
      ></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory
              to={category.slug}
              title={category.name}
              className="block whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[90px]"
            >
              {category.name}
            </PostCategory>
          )}
          <div className="post-info">
            <PostMeta
              to={slugify(user?.username || "", { lower: true })}
              author={user?.fullname}
              date={formatDate}
              className="block whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[100px]"
            ></PostMeta>
          </div>
        </div>
        {/* <h3 className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </h3> */}
        <PostTitle to={data.slug} size="big">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
