import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import { categoryStatus, userRole } from "../../utils/constants";
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
import { db } from "../../firebase-app/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  //   console.log("CategoryUpdate ~ params", params.get("id")); //vi du :http://localhost:3000/manage/update-category?id=303 ta sẽ lấy được 303
  const categoryId = params.get("id");
  const watchStatus = watch("status");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data()); //reset về trạng thái mà ta lấy được thông qua Id sẽ giúp điền các giữu liệu vào form
    }
    fetchData();
  }, [categoryId, reset]);

  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN) return navigate("/");
  if (!categoryId) return null;

  const handleUpdateCategory = async (values) => {
    console.log(values);
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      status: Number(values.status),
      slug: slugify(values.slug || values.name),
    });

    //xử lí khi update ở ở categories thì category trong posts cũng thay đổi theo
    const colRef2 = collection(db, "posts");
    const q = query(colRef2, where("category.id", "==", categoryId));

    const snapshot = await getDocs(q); // Lấy tất cả tài liệu thỏa mãn truy vấn
    const batch = writeBatch(db);

    snapshot.forEach((item) => {
      const docRef = doc(db, "posts", item.id);
      batch.update(docRef, {
        category: {
          ...values,
          id: categoryId,
        }, // Thay đổi user như bạn mong muốn
      });
    });

    await batch.commit();

    toast.success("Update category successfully!!");
    navigate("/manage/category");
  };

  return (
    <div>
      <DashboardHeading
        title="Update Category"
        desc={`Update your category id : ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>

        <div className="gap-x-5 flex justify-center">
          <div>
            <Button
              kind="primary"
              className="mx-auto w-[200px]"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Update category
            </Button>
          </div>

          <div>
            <Button
              to="/manage/category"
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

export default CategoryUpdate;
