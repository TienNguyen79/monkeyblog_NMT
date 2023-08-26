import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import ImageUpload from "../../components/image/ImageUpload";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useAuth } from "../../contexts/auth-context";
import useFireBaseImage from "../../hooks/useFireBaseImage";
import { auth, db } from "../../firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import InputPasswordToggle from "../../components/input/InputPasswordToggle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import slugify from "slugify";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const { userInfo } = useAuth();
  const naviagte = useNavigate();
  const imageUrl = getValues("avatar");
  // console.log(
  //   "🚀 ~ file: UserProfile.js:17 ~ UserProfile ~ userInfo:",
  //   userInfo
  // );
  const deleteAvatar = async () => {
    //khi ấn xóa và thành công nó sẽ cập nhật lại trong data base
    const colRef = doc(db, "users", userInfo.uid);
    await updateDoc(colRef, {
      avatar: "",
      imageName: "",
    });
  };

  const {
    handleSelectImage,
    setImage,
    setProgress,
    handleDeleteImage,
    progress,
    image,
    imageName,
  } = useFireBaseImage(setValue, getValues, deleteAvatar);

  useEffect(() => {
    setImage(imageUrl); //để khi ấn vào xong bay sang trang update-user nó sẽ hiện avatar lên
  }, [imageUrl, setImage]);

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userInfo.uid);
      const singleDoc = await getDoc(colRef);
      // console.log(singleDoc.data());
      reset(singleDoc.data()); //reset về trạng thái mà ta lấy dữ liệu hiện tại của nó  thông qua Id sẽ giúp điền các giữu liệu vào form
    }
    fetchData();
  }, [userInfo.uid, reset]);

  //query
  // useEffect(() => {
  //   async function getData() {
  //     const colRef = collection(db, "posts");
  //     const q = query(colRef, where("user.id", "==", userInfo.uid));

  //     const querySnapshot = await getDocs(q);
  //     let results = [];
  //     querySnapshot.forEach((doc) => {
  //       // results.push({ id: doc.id, ...doc.data() });
  //       // console.log(doc.data());
  //     });
  //     // setCategories(results);
  //   }
  //   getData();
  // });

  if (!userInfo.uid) return null;

  const handleUpdateUser = async (values) => {
    console.log(values);
    if (!isValid) return;
    if (values.confirmPassword !== values.password)
      return toast.error("Confirm the password must match the password");
    try {
      if (values.password) {
        updatePassword(auth.currentUser, values.password)
          .then(() => {
            console.log("Password updated successfully");
          })
          .catch((error) => {
            console.error("Error updating password:", error);
          });
      }

      const colRef = doc(db, "users", userInfo.uid);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
        imageName: imageName,
        username: slugify(values.username || values.fullname, {
          lower: true,
        }),
      });

      const colRef2 = collection(db, "posts");
      const q = query(colRef2, where("user.id", "==", userInfo.uid));

      const snapshot = await getDocs(q); // Lấy tất cả tài liệu thỏa mãn truy vấn
      const batch = writeBatch(db);

      snapshot.forEach((item) => {
        const docRef = doc(db, "posts", item.id);
        batch.update(docRef, {
          user: {
            ...values,
            id: userInfo.uid,
            avatar: image,
            imageName: imageName,
            username: slugify(values.username || values.fullname, {
              //khi không nhập username nó còn biết lấy slug của fullname
              lower: true,
            }),
          }, // Thay đổi user như bạn mong muốn
        });
      });

      await batch.commit();

      toast.success("Update User successfully!!");
      naviagte("/manage/user");
    } catch (error) {
      toast.error("Update User failed!!");
    }
  };

  return (
    <div className="container-user2">
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
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
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              type="date"
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field></Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="password"
              type="text"
              placeholder="Enter your password"
            ></Input>
            {/* <InputPasswordToggle control={control}></InputPasswordToggle> */}
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="text"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div>

        <div className="gap-x-5 flex justify-center">
          <div>
            <Button kind="primary" className="mx-auto w-[200px]" type="submit">
              Update
            </Button>
          </div>

          <div>
            <Button
              to="/"
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

export default UserProfile;
