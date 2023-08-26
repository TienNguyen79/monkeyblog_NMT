import React, { useEffect, useState } from "react";
import DashboardHeading from "../../module/dashboard/DashboardHeading";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import LabelStatus from "../../components/label/LabelStatus";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { categoryStatus, userRole } from "../../utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAuth } from "../../contexts/auth-context";

const CATEGORY_PER_PAGE = 2;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [lastDoc, setLoadDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc),
      limit(1) //load 1 lần được 1 cái
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList([...categoryList, ...results]);
    });

    const documentSnapshots = await getDocs(nextRef);
    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLoadDoc(lastVisible);
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");

      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));

      //phục vụ loadmore
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLoadDoc(lastVisible);
      //-------------------

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(results);
      });
    }
    fetchData();
  }, [filter]);
  // console.log(categoryList);

  const handleDeleteCategory = async (docId) => {
    // console.log(docId);
    const colRef = doc(db, "categories", docId);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef); //thực hiện xóa ở cloud storge
        Swal.fire("Deleted!", "Your Category has been deleted.", "success");
      }
    });
  };

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  const handleHideCategory = async () => {
    const colRef = collection(db, "categories");
    onSnapshot(query(colRef, limit(CATEGORY_PER_PAGE)), (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(results);
    });

    const documentSnapshots = await getDocs(
      query(colRef, limit(CATEGORY_PER_PAGE))
    );
    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLoadDoc(lastVisible); //set lại cái loaddoc này mới loadMore đc tiếp
  };

  const { userInfo } = useAuth();

  if (userInfo.role !== userRole.ADMIN)
    return (
      <div className="text-[30px] font-semibold text-green-500 ">
        This page is for admins only
      </div>
    );

  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      ></DashboardHeading>

      <div className="flex flex-col py-4 gap-x-5 gap-y-5 md:flex md:justify-end md:py-4 md:gap-x-5 md:flex-row ">
        <input
          type="text"
          placeholder="Search....."
          className="border py-2 px-4 font-medium"
          onChange={handleInputFilter}
        />
        <Button className="p-4" height="60px" to="/manage/add-category">
          Create Category
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td className="italic text-gray-400">{category.slug}</td>
                <td>
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}

                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">UnApproved</LabelStatus>
                  )}
                </td>

                <td>
                  <div className="flex iten-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </thead>
      </Table>
      {total > categoryList.length ? (
        <div className="mt-10 flex justify-center">
          <Button
            kind="ghost"
            className="p-[10px] w-[200px]"
            onClick={handleLoadMoreCategory}
          >
            See More+
          </Button>
        </div>
      ) : (
        <div className="mt-10 flex justify-center">
          <Button
            kind="ghost"
            className="p-[10px] w-[200px]"
            onClick={handleHideCategory}
          >
            Hide
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
