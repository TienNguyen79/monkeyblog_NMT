import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-app/firebase-config";
import { useState } from "react";
import { userRole } from "../../utils/constants";

const menuLinks = [
  { url: "/", title: "Home" },
  { url: "/Blog", title: "Blog" },
  { url: "/Contact", title: "Contact" },
];
const HeaderPageStyles = styled.div`
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 18px;
  }
  .header-left {
    display: flex;
    align-items: center;
  }
  .header-right {
    display: flex;
    align-items: center;
  }
  .logo {
    max-width: 45px;
    display: none;
  }

  a {
    text-decoration: none;
    color: black;
  }
  .search-header {
    position: relative;
    display: none;
  }
  .search-input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px 45px 10px 21px;
    border-radius: 4px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    right: 3px;
    transform: translateY(calc(50% + 5px));
    padding-right: 10px;
    padding-left: 10px;
    cursor: pointer;
  }
  .header-button {
    padding: 0 26px;
    margin-left: 14px;
  }
  .header-auth {
    margin-left: 10px;
  }
  .menu {
    /* display: flex; */
    flex-direction: column;
    position: absolute;
    background-color: white;
    box-shadow: 1px 2px 2px 3px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 12px;
    width: 200px;
    left: 14px;
    top: 70px;
    z-index: 9;
  }
  .menu-item {
    padding: 10px;
    border-bottom: 1px solid;
    border-bottom-color: rgba(0, 0, 0, 0.1);
  }
  .bars {
    width: 50px;
    height: 30px;
  }
  .bars-box {
    position: relative;
  }

  /* Media query for tablets and larger */
  @media (min-width: 640px) {
    .menu {
      display: flex;
      flex-direction: row;
      list-style: none;
      column-gap: 10px;
      font-weight: 500;
      padding: 0;
      background-color: white;
      box-shadow: none;
      position: unset;
    }
    .menu-item {
      padding: 0;
      border: none;
    }
    .search-header {
      display: block;
    }
    .logo {
      display: block;
    }
    .bars {
      display: none;
    }
  }

  /* Media query for desktops and larger */
  @media (min-width: 1024px) {
    .menu {
      display: flex;
      flex-direction: row;
      list-style: none;
      column-gap: 10px;
      font-weight: 500;
      padding: 0;
      background-color: white;
      box-shadow: none;
      position: unset;
    }
    .search-header {
      display: block;
    }
    .logo {
      display: block;
    }
    .bars {
      display: none;
    }
    .menu-item {
      padding: 0;
      border: none;
    }
  }
`;
const getFirstName = (name) => {
  if (!name) return "";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
};

const signOut1 = () => {
  signOut(auth);
};
const Header = () => {
  const { userInfo } = useAuth();
  const [show, setShow] = useState(false);
  const [showNavigate, setShowNavigate] = useState(false);
  console.log(
    "🚀 ~ file: Header.js:159 ~ Header ~ showNavigate:",
    showNavigate
  );
  // console.log("🚀 ~ file: Header.js:78 ~ Header ~ userInfo:", userInfo);

  return (
    <HeaderPageStyles>
      <div className="w-full max-w-[1380px] mx-auto p-[20px]">
        <div className="header-main ">
          <div className="header-left">
            <NavLink to="/">
              <img
                srcSet="/logo.png 2x"
                className="logo"
                alt="monkey-blooging"
              />
            </NavLink>

            <div>
              <span
                className="bars-box block cursor-pointer"
                onClick={() => setShowNavigate(!showNavigate)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="bars w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </span>

              <ul
                className={`menu ml-5 md:ml-10 lg:ml-10 z-999 transition-all ${
                  showNavigate ? "translate-y-0" : "-translate-y-[300px]"
                }  `}
              >
                {menuLinks.map((item) => (
                  <li className="menu-item" key={item.title}>
                    <NavLink to={item.url} className="menu-link block ">
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="header-right">
            <div className="search-header ">
              <input
                type="text"
                className="search-input "
                placeholder="Search Posts..."
              />
              <span className="search-icon">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="7.66669"
                    cy="7.05161"
                    rx="6.66669"
                    ry="6.05161"
                    stroke="#999999"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                    stroke="#999999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                    stroke="#999999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
            {!userInfo ? (
              <Button
                type="button"
                to="/sign-up"
                className="header-button"
                height="47px"
              >
                Sign Up
              </Button>
            ) : (
              <div className="header-auth flex items-center gap-x-3">
                {/* <div>
                  Welcome to,{" "}
                  <strong onClick={signOut1}>
                    {getFirstName(userInfo?.displayName)}
                  </strong>{" "}
                </div> */}
                <Button to="/dashboard" className="px-6">
                  DashBoard
                </Button>

                {/* <Link to="/profile"> */}
                <div>
                  <div className="w-[45px] h-[45px] relative z-30">
                    <img
                      className="rounded-full w-full h-full object-cover cursor-pointer"
                      src={userInfo?.avatar}
                      alt=""
                      onClick={() => setShow(!show)}
                    />

                    <div
                      className={`absolute  right-[0px] top-[60px] w-[250px] bg-white shadow-2xl p-3 rounded-md ${
                        show ? "block" : "hidden"
                      } `}
                    >
                      <div className="flex justify-around items-center  border-b-2 pb-3">
                        <img
                          src={userInfo.avatar}
                          className="w-full h-full max-w-[40px] max-h-[40px] rounded-full object-cover"
                          alt=""
                        />
                        <div className="w-full ml-[10px]">
                          <h2 className="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[170px]">
                            {userInfo.fullname}
                          </h2>
                          <span className="block whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[170px]">
                            {userInfo.username}
                          </span>
                        </div>
                      </div>
                      <Link to="/profile">
                        <span className="block hover:text-slate-400 border-b-2 border-b-slate-100 pb-3  pt-3 pl-3">
                          Edit Profile
                        </span>
                      </Link>
                      {userInfo.role === userRole.ADMIN ? (
                        <Link to="/manage/add-post">
                          <span className="block hover:text-slate-400 pb-2  pt-3 pl-3">
                            WritePost
                          </span>
                        </Link>
                      ) : (
                        <Link to="/user-add-post">
                          <span className="block hover:text-slate-400 pb-2  pt-3 pl-3">
                            WritePost
                          </span>
                        </Link>
                      )}
                      <Link to="/my-post">
                        <span className="block hover:text-slate-400 border-b-2 border-b-slate-100 pb-3  pt-3 pl-3">
                          My Post
                        </span>
                      </Link>
                      <span
                        onClick={signOut1}
                        className="block hover:text-slate-400  pb-3  pt-3 pl-3 cursor-pointer"
                      >
                        LogOut
                      </span>
                    </div>
                  </div>
                </div>

                {/* </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderPageStyles>
  );
};

export default Header;
