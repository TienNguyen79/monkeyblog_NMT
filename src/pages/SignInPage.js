import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import IconEyeClose from "../components/icon/IconEyeClose";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import InputPasswordToggle from "../components/input/InputPasswordToggle";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please Enter your Email"),

  password: yup
    .string()
    .required("Please Enter your password")
    .min(6, "Please Enter at lease 6 character."),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   {
  //     message:
  //       "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
  //   }
  // ),
});

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  //   console.log("🚀 ~ file: SignInPage.js:6 ~ SignInPage ~ userInfo:", userInfo);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    // await signInWithEmailAndPassword(auth, values.email, values.password);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      navigate("/");
      // User login successful
      // Do something, e.g., redirect to a dashboard page
    } catch (error) {
      // Handle login errors
      // const errorCode = error.code;
      // const errorMessage = error.message;

      // Set the error message to display to the user
      // setErrorMessage("Tài khoản hoặc mật khẩu không chính xác");

      toast.error("Tài khoản hoặc mật khẩu không chính xác");
    }
  };
  useEffect(() => {
    document.title = "SignIn Page";
    if (userInfo?.email) {
      navigate("/");
    }
  }, []);

  //Toast thông báo lỗi
  useEffect(() => {
    const arrError = Object.values(errors); //Đưa vào mảng

    if (arrError.length > 0) {
      toast.error(arrError[0]?.message, {
        pauseOnHover: false,
        autoClose: 2000,
      });
    }
  }, [errors]);

  return (
    <AuthenticationPage>
      <form action="" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email" className="lable">
            Email address
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your Email ..."
            control={control} //đăng kí form
          ></Input>
        </Field>

        <Field>
          <Label htmlFor="password" className="lable">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="no-account">
          You are have account ?
          <NavLink className="linkSignUp" to={"/sign-up"}>
            SignUp
          </NavLink>
        </div>
        <div style={{ display: "flex" }}>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            // style={{ maxWidth: 300, margin: "0 auto", width: "100%" }}
            className="max-w-[300px] mx-auto w-full"
          >
            Sign In
          </Button>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
