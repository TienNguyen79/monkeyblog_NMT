import React, { useEffect, useState } from "react";
import Heading from "../../components/layout/Heading";
import PostItem from "./PostItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";

const PostRelated = ({ categoryId = "" }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId)
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
  }, [categoryId]);

  // console.log(posts);
  if (!categoryId || posts.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading>Related Posts</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.map((item) => (
          <PostItem key={item.id} data={item}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
