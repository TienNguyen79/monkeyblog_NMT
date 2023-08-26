import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import Dropdown from "../../components/dropdown/Dropdown";
import Table from "../../components/table/Table";
import Button from "../../components/button/Button";
import Select from "../../components/dropdown/Select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import ActionView from "../../components/action/ActionView";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import { debounce } from "lodash";
import { postStatus, userRole } from "../../utils/constants";
import LabelStatus from "../../components/label/LabelStatus";
import Swal from "sweetalert2";
import List from "../../components/dropdown/List";
import Options from "../../components/dropdown/Options";
import { useAuth } from "../../contexts/auth-context";

const POST_PER_PAGE = 2;
const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [lastDoc, setLoadDoc] = useState();
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [searchWithCategory, setSearchWithCategory] = useState("");
  const [titleCategory, setTitleCategory] = useState("");
  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
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
      setPostList([...postList, ...results]);
    });

    const documentSnapshots = await getDocs(nextRef);
    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLoadDoc(lastVisible);
  };

  //có setPostList để đổ ra giao diện
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");

      // const newRef = searchWithCategory
      //   ? query(
      //       colRef,
      //       // where("title", ">=", filter),
      //       // where("title", "<=", filter + "utf8"),
      //       where("category.name", "==", searchWithCategory)
      //     )
      //   : query(colRef, limit(1));

      // const newRef = searchWithCategory
      //   ? query(colRef, where("category.name", "==", searchWithCategory))
      //   : query(colRef, limit(1));

      //phục vụ loadmore

      let newRef = colRef;

      if (filter) {
        newRef = query(newRef, where("title", ">=", filter));
        newRef = query(newRef, where("title", "<=", filter + "utf8"));
      }

      //bỏ này ra sẽ tìm kiếm được kiểu dropdown
      // if (searchWithCategory) {
      //   newRef = query(
      //     newRef,
      //     where("category.name", "==", searchWithCategory)
      //   );
      // }

      if (!filter && !searchWithCategory) {
        newRef = query(newRef, limit(POST_PER_PAGE));
      }

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
        setPostList(results);
      });
    }
    fetchData();
  }, [filter, searchWithCategory]);

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  //chức năng hide
  const handleHidePost = async () => {
    const colRef = collection(db, "posts");
    onSnapshot(query(colRef, limit(POST_PER_PAGE)), (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList(results);
    });

    const documentSnapshots = await getDocs(
      query(colRef, limit(POST_PER_PAGE))
    );
    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLoadDoc(lastVisible); //set lại cái loaddoc này mới loadMore đc tiếp
  };

  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">APPROVED</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">PENDING</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="danger">REJECTED</LabelStatus>;
      default:
        break;
    }
  };

  //xử lí xóa
  const handleDeleteCategory = async (postId) => {
    const colRef = doc(db, "posts", postId);

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
        Swal.fire("Deleted!", "Your Post has been deleted.", "success");
      }
    });
  };
  // console.log(postList);

  //set dữ liệu category vào setCategories
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
  }, [setCategories]);

  //Click ở dropdown
  const handleClickOption = async (item) => {
    // setValue("categoryId", item.id);
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);

    setSearchWithCategory(docData.data().name);
    // console.log(docData.data().name);

    setTitleCategory(item.name);
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
        title="All posts"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="mb-10 flex justify-end gap-5">
        <div className="w-full max-w-[300px]">
          {/* <Dropdown> */}
          <Dropdown>
            <Select placeholder={titleCategory || "Choose Category"}>
              Category
            </Select>
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
          {/* </Dropdown> */}
        </div>
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleInputFilter}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post) => (
              <tr key={post.id}>
                <td title={post.id}>{post.id.slice(0, 5) + "..."}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="">
                      <h3
                        title={post.title}
                        className="font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px] "
                      >
                        {post.title}
                      </h3>
                      <time className="text-sm text-gray-500">
                        {new Date(
                          post?.createdAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post.category?.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post.user?.fullname}</span>
                </td>
                <td>{renderPostStatus(post.status)}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionView
                      onClick={() => navigate(`/${post.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post?id=${post.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(post.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="mt-10 text-center">
        {/* <Pagination></Pagination> */}
        {total > postList.length && !filter && (
          <Button
            kind="ghost"
            className="mx-auto w-[200px]"
            onClick={handleLoadMorePost}
          >
            See more+
          </Button>
        )}

        {total <= postList.length && !filter && (
          <Button
            kind="ghost"
            className="mx-auto w-[200px]"
            onClick={handleHidePost}
          >
            Hide
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostManage;
