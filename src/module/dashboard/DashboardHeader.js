import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { userRole } from "../../utils/constants";
import Sidebar from "./Sidebar";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  /* PC styles (>=1024px) */
  @media (min-width: 1024px) {
    /* PC styles */
    .barsdetails {
      display: none;
    }
  }

  /* Tablet styles (>=768px and <1024px) */
  @media (min-width: 640px) and (max-width: 1023px) {
    /* Tablet styles */
    .logodashboard {
      display: none;
    }
  }

  /* Mobile styles (<640px) */
  @media (max-width: 640px) {
    /* Mobile styles */
    .logodashboard {
      display: none;
    }
  }
`;

const DashboardHeader = ({ onToggleSidebar }) => {
  const { userInfo } = useAuth();
  // console.log(
  //   "🚀 ~ file: DashboardHeader.js:27 ~ DashboardHeader ~ userInfo:",
  //   userInfo.role
  // );
  return (
    <DashboardHeaderStyles>
      <div className="logodashboard w-[50px] ml-10">
        <NavLink to="/">
          <img srcSet="/logo.png 2x" alt="" />
        </NavLink>
      </div>

      <div onClick={onToggleSidebar} className="relative">
        <span className="barsdetails block p-5 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </span>
      </div>

      <div className="flex gap-x-3">
        {userInfo.role === userRole.ADMIN ? (
          <Button
            to="/manage/add-post"
            className="header-button p-4"
            height="52px"
          >
            Write new post Admin
          </Button>
        ) : (
          <Button
            to="/user-add-post"
            className="header-button p-4"
            height="52px"
          >
            Write new post User
          </Button>
        )}

        <Link to="/profile">
          <div className="header-avatar">
            <img src={userInfo?.avatar} alt="" />
          </div>
        </Link>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
