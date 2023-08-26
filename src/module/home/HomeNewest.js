import { useState } from "react";
import Heading from "../../components/layout/Heading";
import PostItem from "../../module/post/PostItem";
import PostNewestItem from "../../module/post/PostNewestItem";
import PostNewestLarge from "../../module/post/PostNewestLarge";
import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { Fragment } from "react";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  /* PC styles (>=1024px) */
  @media (min-width: 1024px) {
    /* PC styles */
  }

  /* Tablet styles (>=768px and <1024px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    /* Tablet styles */
    .layout {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

  /* Mobile styles (<640px) */
  @media (max-width: 640px) {
    /* Mobile styles */
    .layout {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
`;

const dataTest = [];

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );

    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        // console.log(doc.data());

        results.push({ id: doc.id, ...doc.data() });
      });
      setPosts(results);
    });
  }, []);

  const [first, ...other] = posts;
  // console.log("🚀 ~ file: HomeNewest.js:56 ~ HomeNewest ~ first:", first);

  if (posts.length <= 0) return null;

  return (
    <HomeNewestStyles className="home-block">
      <div className="container-primary">
        <Heading>New Post</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="sidebar">
            {other.length > 0 ? (
              other.map((item) => (
                <PostNewestItem key={item.id} data={item}></PostNewestItem>
              ))
            ) : (
              <Fragment>
                <div>Những bài viết tiếp theo sẽ xuất hiện ở đây !</div>
              </Fragment>
            )}
          </div>
        </div>
        {/* <div className="grid-layout grid-layout--primary">
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div> */}
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
