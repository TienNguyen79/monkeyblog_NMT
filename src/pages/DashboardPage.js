import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-app/firebase-config";
import { useAuth } from "../contexts/auth-context";
import { Link } from "react-router-dom";
import { userRole } from "../utils/constants";

const DashboardPage = () => {
  const [quantityUser, setQuantityUser] = useState(0);
  const [quantityCategory, setQuantityCategory] = useState(0);
  const [quantityPost, setQuantityPost] = useState(0);
  const { userInfo } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const querySnapshot = await getDocs(colRef);
      setQuantityUser(querySnapshot.size);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      const querySnapshot = await getDocs(colRef);
      setQuantityCategory(querySnapshot.size);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const querySnapshot = await getDocs(colRef);
      setQuantityPost(querySnapshot.size);
    }
    fetchData();
  }, []);

  if (userInfo.role !== userRole.ADMIN)
    return (
      <div className="text-[30px] font-semibold text-green-500 ">
        This page is for admins only
      </div>
    );

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-y-10  md:grid-cols-2 md:gap-x-10 lg:grid-cols-2 lg:gap-x-10">
        <Link to="/manage/user" className="w-full max-w-[400px]">
          <div className="w-full shadow-xl p-6   flex gap-x-3 rounded-lg">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#16BBE5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </span>
            <div className="flex flex-col justify-center ml-4">
              <span className="block text-[30px] font-semibold ">
                {quantityUser}
              </span>
              <span className="block text-[#B2C5DC]">User</span>
            </div>
          </div>
        </Link>
        <Link to="/manage/posts" className="w-full max-w-[400px]">
          <div className="w-full  shadow-xl p-6   flex gap-x-3 rounded-lg">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#EA5D5D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </span>
            <div className="flex flex-col justify-center ml-4">
              <span className="block text-[30px] font-semibold">
                {quantityPost}
              </span>
              <span className="block text-[#B2C5DC]">Posts</span>
            </div>
          </div>
        </Link>
        <Link to="/manage/category" className="w-full max-w-[400px]">
          <div className="w-full  shadow-xl p-6   flex gap-x-3 rounded-lg">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#FCAD73]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </span>
            <div className="flex flex-col justify-center ml-4">
              <span className="block text-[30px] font-semibold">
                {quantityCategory}
              </span>
              <span className="block text-[#B2C5DC]">Category</span>
            </div>
          </div>
        </Link>
        <div className="w-full max-w-[400px] shadow-xl p-6   flex gap-x-3 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-16 w-16 text-[#FCAD73]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="flex flex-col justify-center ml-4">
            <span className="block text-[30px] font-semibold">
              {quantityPost * 30 + quantityUser * 40}
            </span>
            <span className="block text-[#B2C5DC]">Coin</span>
          </div>
        </div>
      </div>
      <div className="mt-10 mr-20">
        <div className="flex flex-col items-center shadow-lg w-[full] max-w-[250px] mx-auto p-5 rounded-lg gap-y-4  ">
          <img
            src={userInfo.avatar}
            className="w-full h-full max-w-[150px] max-h-[150px] rounded-full object-cover"
            alt=""
          />
          <span className="block text-[20px] font-semibold">
            {userInfo.fullname}
          </span>
          <span className="block">Hello , I am admin</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
