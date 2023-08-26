import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import PostItem from "../module/post/PostItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

const AuthorPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  //   console.log("🚀 ~ file: CategoryPage.js:13 ~ CategoryPage ~ params:", params); //{slug: ...}
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("user.username", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [params.slug]);

  // console.log(posts);
  if (posts.length <= 0) return null;
  return (
    <Layout>
      <div className="container-primary">
        <div className="pt-10"></div>
        <Heading>Author {posts[0].user.fullname}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
