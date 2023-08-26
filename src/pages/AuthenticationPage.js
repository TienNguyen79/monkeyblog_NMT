import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  background-image: url("https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  .logo {
    margin: 0 auto 10px;
  }
  .heading {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    color: ${(props) => props.theme.primary};
  }
  form {
    max-width: 650px;
    width: 100%;
    margin: 20px auto;
  }
  .have-account,
  .no-account {
    text-decoration: none;
    margin-bottom: 20px;
  }
  .linkSignIn,
  .linkSignUp {
    text-decoration: none;
    color: ${(props) => props.theme.primary};
    margin-left: 5px;
  }
`;
const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationStyles>
      <div className="container-user">
        <NavLink to="/">
          <img srcSet="/logo.png 2x" alt="Monkey-blogging" className="logo" />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenticationStyles>
  );
};

export default AuthenticationPage;
