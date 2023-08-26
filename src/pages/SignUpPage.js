import React, { Children, useEffect, useState } from "react";
import styled from "styled-components";
import Label from "../components/label/Label";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import Field from "../components/field/Field";
import Button from "../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import slugify from "slugify";
import { userRole, userStatus } from "../utils/constants";
import ImageUpload from "../components/image/ImageUpload";
import useFireBaseImage from "../hooks/useFireBaseImage";
const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
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
`;

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please Enter your Email"),

  fullname: yup.string().required("Please Enter your FullName"),
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

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  // console.log("🚀 ~ file: SignUpPage.js:57 ~ SignUpPage ~ errors:", errors);

  const {
    handleSelectImage,
    setImage,
    setProgress,
    handleDeleteImage,
    progress,
    image,
    imageName,
  } = useFireBaseImage(setValue, getValues);

  const handleSignUp = async (values) => {
    // console.log(values);
    if (!isValid) return;

    await createUserWithEmailAndPassword(auth, values.email, values.password);

    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1101&q=80",
    });

    //lưu vào cloud fireStore nhưng với uid hiện tại chứ không phải uid ngẫu nhiên

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar: image,
      imageName: imageName,
      description: `Hello , I am ${values.fullname} . Thank you for your interest in my blog `,
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });
    // const colRef = collection(db, "users");
    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });

    toast.success("Regiser account successfully!!");
    navigate("/");
  };

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

  useEffect(() => {
    document.title = "SignUp Page";
  }, []);
  return (
    <AuthenticationPage>
      <form action="" onSubmit={handleSubmit(handleSignUp)}>
        <div className="w-[200px] h-[200px] mx-auto mb-10 ">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <Field>
          <Label htmlFor="fullname" className="lable">
            Fullname
          </Label>
          <Input
            name="fullname"
            type="text"
            placeholder="Enter your fullName ..."
            control={control} //đăng kí form
          ></Input>

          {/* <p style={{ color: "red" }}>{errors.fullname?.message}</p> */}
        </Field>

        <Field>
          <Label htmlFor="email" className="lable">
            Email address
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your Email ..."
            control={control}
          ></Input>
        </Field>

        <Field>
          <Label htmlFor="password" className="lable">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You are have account ?
          <NavLink className="linkSignIn" to={"/sign-in"}>
            SignIn
          </NavLink>
        </div>
        <div style={{ display: "flex" }}>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            style={{ maxWidth: 300, margin: "0 auto", width: "100%" }}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
