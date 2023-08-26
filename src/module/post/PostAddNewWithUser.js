import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Options from "../../components/dropdown/Options";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { postStatus, userRole } from "../../utils/constants";
import ImageUpload from "../../components/image/ImageUpload";
import useFireBaseImage from "../../hooks/useFireBaseImage";
import Toggle from "../../components/toggle/Toggle";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
// import useFirebaseImage from "../../hooks/useFireBaseImage";

// const storage = getStorage(); //lỗi thì để vào trong component
import ImageUploader from "quill-image-uploader";
Quill.register("modules/imageUploader", ImageUploader);

const PostAddNewStyles = styled.div``;

const PostAddNewWithUser = () => {
  const { userInfo } = useAuth();
  const [content, setContent] = useState("");
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      user: {},
      content: "",
    },
  });

  const {
    handleSelectImage,
    setImage,
    setProgress,
    handleDeleteImage,
    progress,
    image,
    imageName,
  } = useFireBaseImage(setValue, getValues); //sử dụng custom hook

  // console.log("PostAddNew ~ watchCategory", watchCategory);

  //set object user vào field: users để tối ưu hóa được bên component khác
  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapShot = await getDocs(q);

      querySnapShot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);

  const [categories, setCategories] = useState([]);
  const [titleCategory, setTitleCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      // imageUploader: {
      //   upload: (file) => {
      //     return new Promise((reslove, reject) => {
      //       reslove(
      //         "https://images.unsplash.com/photo-1692610492938-37a4eed63ac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
      //       );
      //     });
      //   },
      // },
    }),
    []
  );

  //query
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));

      const querySnapshot = await getDocs(q);
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategories(results);
    }
    getData();
  }, []);
  //handle dropdown option đã tôi ưu hóa kiểu nhét cả 1 object category và field : categories
  const handleClickOption = async (item) => {
    // setValue("categoryId", item.id);
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });

    setTitleCategory(item);
  };

  useEffect(() => {
    document.title = "Monkey - Add new Posts";
  });

  const addPostHandler = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true }); // người dùng nhập tiếng việt nó sẽ slug chính nó, lower : đưa về chữ thường hết
      cloneValues.status = Number(values.status);
      console.log(cloneValues);

      // thêm posts
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        imageName,
        // categoryId: cloneValues.category.id,
        // userId: cloneValues.user.id,
        content: content,
        createdAt: serverTimestamp(),
      });
      navigate("/my-post");
      toast.success("Create new Posts successfully!!");
      //reset
      reset({
        title: "",
        slug: "",
        status: 2,
        category: {},
        user: {},
        hot: false,
        image: "",
        content: "",
      });
      setImage("");
      setProgress(0);
      setTitleCategory({});
      //---------
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form action="" onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-1 gap-x-10 mb-10 items-start md:grid-cols-2 md:gap-x-10 md:mb-10 md:items-start">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-x-10 mb-10 items-start md:grid-cols-2 md:gap-x-10 md:mb-10 md:items-start">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              className="h-[250px]"
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Select
                placeholder={titleCategory.name || "Select the category"}
              ></Select>
              <List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Options
                      key={item.name}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Options>
                  ))}
              </List>
            </Dropdown>
          </Field>

          {/* <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author"></Input>
          </Field> */}
        </div>
        <div className="mb-10 entry-content">
          <Label>Content</Label>
          <div className="mt-4">
            <ReactQuill
              modules={modules}
              theme="snow"
              value={content}
              onChange={setContent}
              className="w-full max-w-[350px] md:max-w-[760px] lg:max-w-full "
            />
          </div>
        </div>

        <div className="flex mr-14">
          <Button
            type="submit"
            className="mx-auto w-[200px]"
            isLoading={loading}
            disable={loading}
          >
            Add new post
          </Button>
        </div>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNewWithUser;
