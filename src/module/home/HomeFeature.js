import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Heading from "../../components/layout/Heading";
import PostFeatureItem from "../../module/post/PostFeatureItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase-app/firebase-config";

const HomeFeatureStyles = styled.div`
  margin-top: 30px;

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
  }
`;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      //  orderBy("createdAt", "desc"), //sắp xếp từ mới nhất đến cũ nhất
      limit(6)
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

  if (posts.length <= 0) return null;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container-primary">
        <Heading>Featured Posts</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
