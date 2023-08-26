import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import ImageUpload from "../../components/image/ImageUpload";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import InputPasswordToggle from "../../components/input/InputPasswordToggle";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userRole, userStatus } from "../../utils/constants";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../../firebase-app/firebase-config";
import useFireBaseImage from "../../hooks/useFireBaseImage";
import { toast } from "react-toastify";
import Textarea from "../../components/textarea/Textarea";
import { useAuth } from "../../contexts/auth-context";
import slugify from "slugify";
import { updatePassword } from "firebase/auth";

const UserUpdate = () => {
  const [params] = useSearchParams();
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
  //   console.log("CategoryUpdate ~ params", params.get("id")); //vi du :http://localhost:3000/manage/update-category?id=303 ta sẽ lấy được 303
  const UserId = params.get("id");
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageUrl = getValues("avatar");

  const navigate = useNavigate();

  const {
    handleSelectImage,
    setImage,
    setProgress,
    handleDeleteImage,
    progress,
    image,
    imageName,
  } = useFireBaseImage(setValue, getValues, deleteAvatar);

  async function deleteAvatar() {
    //khi ấn xóa và thành công nó sẽ cập nhật lại trong data base
    const colRef = doc(db, "users", UserId);
    await updateDoc(colRef, {
      avatar: "",
      imageName: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl); //để khi ấn vào xong bay sang trang update-user nó sẽ hiện avatar lên
  }, [imageUrl, setImage]);

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", UserId);
      const singleDoc = await getDoc(colRef);
      // console.log(singleDoc.data());
      reset(singleDoc.data()); //reset về trạng thái mà ta lấy dữ liệu hiện tại của nó  thông qua Id sẽ giúp điền các giữu liệu vào form
    }
    fetchData();
  }, [UserId, reset]);

  // console.log("imageName" + imageName);
  // console.log(imageUrl);
  // useEffect(() => {
  //   async function fetchData() {
  //     const colRef = collection(db, "posts");
  //     const q = query(colRef, where("user.id", "==", UserId));
  //     onSnapshot(q, (snapshot) => {
  //       snapshot.forEach((item) => {
  //         console.log(item.data().user);
  //       });
  //     });
  //     // console.log(q);
  //   }
  //   fetchData();
  // }, [UserId]);

  // if (!UserId) return null;

  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN)
    return (
      <div className="text-[30px] font-semibold text-green-500 ">
        This page is for admins only
      </div>
    );

  const handleUpdateUser = async (values) => {
    // console.log(values);
    if (!isValid) return;
    try {
      const colRef = doc(db, "users", UserId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
        imageName: imageName,
        username: slugify(values.username || values.fullname, {
          lower: true,
        }),
      });
      // console.log(colRef);
      // const cloneValue = { ...values };
      //xử lí khi update user thì user trong posts cũng phải thay đổi theo
      const colRef2 = collection(db, "posts");
      const q = query(colRef2, where("user.id", "==", UserId));

      const snapshot = await getDocs(q); // Lấy tất cả tài liệu thỏa mãn truy vấn
      const batch = writeBatch(db);

      snapshot.forEach((item) => {
        const docRef = doc(db, "posts", item.id);
        batch.update(docRef, {
          user: {
            ...values,
            id: UserId,
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

      //----------------------------------------
      toast.success("Update User successfully!!");
      navigate("/manage/user");
    } catch (error) {
      toast.error("Update User failed!!");
    }
  };

  return (
    <div>
      <DashboardHeading
        title="Update User"
        desc={`Update your User id : ${UserId}`}
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
              Update User
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

export default UserUpdate;
