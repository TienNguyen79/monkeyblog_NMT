import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import PostItem from "../module/post/PostItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  //   console.log("🚀 ~ file: CategoryPage.js:13 ~ CategoryPage ~ params:", params); //{slug: ...}
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug) //category.slug kiểu danh mục gì
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

  if (posts.length <= 0) return null;
  return (
    <Layout>
      <div className="container-primary">
        <div className="pt-10"></div>
        <Heading>Category {posts[0].category.name}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
