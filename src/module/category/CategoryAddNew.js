import React from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../../module/dashboard/DashboardHeading";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import slugify from "slugify";
import { categoryStatus, userRole } from "../../utils/constants";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
const CategoryAddNew = () => {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const navigate = useNavigate();

  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    // if(values.name)

    const newValues = { ...values }; //clone value
    newValues.slug = slugify(newValues.name || newValues.slug, {
      lower: true,
    });
    //--------------------
    try {
      const colRef = collection(db, "categories");

      const querySnapshot = await getDocs(colRef);
      //check tránh trùng category
      let flag = true;
      querySnapshot.forEach((doc) => {
        if (
          values.name === doc.data().name ||
          values.slug === doc.data().slug
        ) {
          flag = false;
        }
        // console.log(doc.data().name);
      });

      if (flag) {
        await addDoc(colRef, {
          ...newValues,
          // id:
          createdAt: serverTimestamp(),
        });
        toast.success("Add category successfully!!");
        navigate("/manage/category");
      } else {
        toast.error("Add category failed!!");
      }
    } catch (error) {
      toast.error("Add category failed !!");
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };
  const watchStatus = watch("status");

  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN) return navigate("/");
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
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
              Add new category
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

export default CategoryAddNew;
