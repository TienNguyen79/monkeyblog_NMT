import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { useAuth } from "../../contexts/auth-context";
import NotFoundPage from "../../pages/NotFoundPage";
import { useState } from "react";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
  /* PC styles (>=1024px) */
  @media (min-width: 1024px) {
    /* PC styles */
  }

  /* Tablet styles (>=768px and <1024px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    /* Tablet styles */
    .dashboard-main {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }

  /* Mobile styles (<640px) */
  @media (max-width: 640px) {
    /* Mobile styles */
    .dashboard-main {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth();
  // console.log(
  //   "🚀 ~ file: DashboardLayout.js:30 ~ DashboardLayout ~ userInfo:",
  //   userInfo
  // );
  const [showSidebar, setShowSidebar] = useState(false);
  if (!userInfo) return <NotFoundPage></NotFoundPage>;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); // Đảo trạng thái hiển thị Sidebar khi click
  };

  return (
    <DashboardStyles>
      <DashboardHeader onToggleSidebar={toggleSidebar}></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar showSidebar={showSidebar}></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
