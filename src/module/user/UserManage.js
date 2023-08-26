import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useState } from "react";
import UserTable from "./UserTable";
import Button from "../../components/button/Button";
import { useAuth } from "../../contexts/auth-context";
import { userRole } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const UserManage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  if (userInfo.role !== userRole.ADMIN)
    return (
      <div className="text-[30px] font-semibold text-green-500 ">
        This page is for admins only
      </div>
    );
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
