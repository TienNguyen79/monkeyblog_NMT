import React, { useMemo } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import Options from "../../components/dropdown/Options";
import Toggle from "../../components/toggle/Toggle";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import { postStatus, userRole } from "../../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useState } from "react";
import slugify from "slugify";
import { toast } from "react-toastify";
import ImageUpload from "../../components/image/ImageUpload";
import useFireBaseImage from "../../hooks/useFireBaseImage";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { useAuth } from "../../contexts/auth-context";
Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
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

  const [params] = useSearchParams();
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const postId = params.get("id");
  const [categories, setCategories] = useState([]);
  const [titleCategory, setTitleCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const imageUrl = getValues("image");

  const deleteImagePost = async () => {
    //khi ấn xóa và thành công nó sẽ cập nhật lại trong data base
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
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
  } = useFireBaseImage(setValue, getValues, deleteImagePost);

  useEffect(() => {
    setImage(imageUrl); //để khi ấn vào xong bay sang trang update-user nó sẽ hiện avatar lên
  }, [imageUrl, setImage]);

  //reset về trạng thái mà ta lấy được thông qua Id sẽ giúp điền các giữu liệu vào form
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data()); //reset về trạng thái mà ta lấy được thông qua Id sẽ giúp điền các giữu liệu vào form
    }
    fetchData();
  }, [postId, reset]);

  //phục vụ drop down
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      // const q = query(colRef, where("status", "==", 1));

      const querySnapshot = await getDocs(colRef);
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategories(results);
    }
    getData();
  }, []);
  // console.log(categories.name);

  //khi ấn sửa sang trang update nó sẽ bắn tên lên dropdown đồng thời setcontent để lấy nội dung content
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      setSelectedCategory(singleDoc.data().category.name);
      setContent(singleDoc.data().content || "");
      // console.log(singleDoc.data().category.name);
    }
    fetchData();
  }, [postId]);

  //Chọn ở dropdown nó sẽ bắn tên lên đầu
  const handleClickOption = async (item) => {
    // setValue("categoryId", item.id);
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);

    // console.log(docData.data().name);
    setValue("category", {
      id: item.id,
      ...docData.data(),
    });

    setSelectedCategory(docData.data().name);
  };

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
    }),
    []
  );

  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN)
    return (
      <div className="text-[30px] font-semibold text-green-500 ">
        This page is for admins only
      </div>
    );

  if (!postId || postId.title) return null;
  //xử lí update
  const updatePostHandler = async (values) => {
    if (!isValid) return;
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true }); // người dùng nhập tiếng việt nó sẽ slug chính nó, lower : đưa về chữ thường hết
      cloneValues.status = Number(values.status);

      // console.log(cloneValues);
      // thêm posts
      const colRef = doc(db, "posts", postId);
      await updateDoc(colRef, {
        ...cloneValues,
        image: image,
        imageName: imageName,
        content: content,
        createdAt: serverTimestamp(),
      });
      navigate("/manage/posts");
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
      });
      setImage("");
      setProgress(0);
      setTitleCategory({});
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
    // console.log(values);
  };

  return (
    <div>
      <DashboardHeading
        title="Update Posts"
        desc="Manage all posts"
      ></DashboardHeading>

      <form action="" onSubmit={handleSubmit(updatePostHandler)}>
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
                placeholder={selectedCategory || "Select the category"}
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
        <div className="grid grid-cols-1 gap-x-10 mb-10 items-start md:grid-cols-2 md:gap-x-10 md:mb-10 md:items-start">
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                // onClick={() => setValue("status", "approved")}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                // onClick={() => setValue("status", "pending")}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                // onClick={() => setValue("status", "reject")}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>

        <div className="gap-x-5 flex justify-center">
          <div>
            <Button
              type="submit"
              className="mx-auto w-[200px]"
              isLoading={loading}
              disable={loading}
            >
              Update new post
            </Button>
          </div>

          <div>
            <Button
              to="/manage/posts"
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

export default PostUpdate;
