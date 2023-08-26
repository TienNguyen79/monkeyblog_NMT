import React, { useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/image/ImageUpload";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { userRole, userStatus } from "../../utils/constants";
import useFireBaseImage from "../../hooks/useFireBaseImage";
import { auth, db } from "../../firebase-app/firebase-config";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";
import InputPasswordToggle from "../../components/input/InputPasswordToggle";
import { useNavigate } from "react-router-dom";
import Textarea from "../../components/textarea/Textarea";
import { useAuth } from "../../contexts/auth-context";
const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      imageName: "",
      description: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const navigate = useNavigate();
  const {
    handleSelectImage,
    setImage,
    setProgress,
    handleDeleteImage,
    progress,
    image,
    imageName,
  } = useFireBaseImage(setValue, getValues);

  // console.log("imageName: " + imageName);
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN)
    return (
      <div className="text-[30px] font-semibold text-green-500 ">
        This page is for admins only
      </div>
    );

  const handleCreateUser = async (values) => {
    if (!isValid) return;

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });

      await addDoc(collection(db, "users"), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.username || values.fullname, {
          lower: true,
        }),
        avatar: image,
        imageName: imageName,
        description: values.description,
        status: values.status,
        role: values.role,
        createdAt: serverTimestamp(),
      });

      setImage("");
      setProgress(0);
      toast.success("Create User successfully ");
      navigate("/manage/user");
      reset({
        fullname: "",
        email: "",
        password: "",
        username: "",
        avatar: "",
        imageName: "",
        description: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log(error);
      toast.error("Can't create User");
    }
  };

  // const { userInfo } = useAuth();
  // if (userInfo.role !== userRole.ADMIN) return navigate("/");
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="w-[200px] h-[200px] mx-auto mb-10 ">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            {/* <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input> */}
            <InputPasswordToggle control={control}></InputPasswordToggle>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>

              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Description</Label>
            <Textarea name="description" control={control}></Textarea>
          </Field>
        </div>

        <div className="gap-x-5 flex justify-center">
          <div>
            <Button
              kind="primary"
              className="mx-auto w-[200px]"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Add new user
            </Button>
          </div>

          <div>
            <Button
              to="/manage/user"
              className="mx-auto w-[100px] sm:w-[200px] md:w-[200px] lg:w-[200px]  "
              kind="ghost"
              type="submit"
            >
              Back
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserAddNew;
