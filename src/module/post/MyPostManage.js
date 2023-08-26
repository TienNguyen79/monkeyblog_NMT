import React, { useEffect, useState } from "react";
// import { useAuth } from "../contexts/auth-context";
// import { postStatus, userRole } from "../utils/constants";
import { useNavigate } from "react-router-dom";
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
// import { db } from "../firebase-app/firebase-config";
// import DashboardHeading from "../module/dashboard/DashboardHeading";
// import Table from "../components/table/Table";
// import LabelStatus from "../components/label/LabelStatus";
// import ActionView from "../components/action/ActionView";
// import ActionEdit from "../components/action/ActionEdit";
// import ActionDelete from "../components/action/ActionDelete";
import Swal from "sweetalert2";
// import Button from "../components/button/Button";
import { debounce } from "lodash";
import LabelStatus from "../../components/label/LabelStatus";
import DashboardHeading from "../dashboard/DashboardHeading";
import Table from "../../components/table/Table";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import Button from "../../components/button/Button";
import { useAuth } from "../../contexts/auth-context";
import { postStatus } from "../../utils/constants";
import { db } from "../../firebase-app/firebase-config";

const POST_PER_PAGE = 2;
const MyPostManage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLoadDoc] = useState();
  const [total, setTotal] = useState(0);
  // if (userInfo.role !== userRole.ADMIN) return navigate("/");
  // console.log(userInfo.uid);
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
      setPosts([...posts, ...results]);
    });

    const documentSnapshots = await getDocs(nextRef);
    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLoadDoc(lastVisible);
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "posts");

      const q = query(
        colRef,
        where("user.id", "==", userInfo?.uid),
        limit(POST_PER_PAGE)
      );

      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : q;

      //phục vụ loadmore
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLoadDoc(lastVisible);

      onSnapshot(
        query(colRef, where("user.id", "==", userInfo?.uid)),
        (snapshot) => {
          const count = [];
          snapshot.forEach((item) => {
            count.push(item.data());
          });
          setTotal(count.length);
        }
      );
      //------------------------------

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    getData();
  }, [filter, userInfo.uid]);

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

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  //phức tạp hơn các cái khác
  const handleHidePost = async () => {
    const colRef = collection(db, "posts");

    const q = query(
      colRef,
      where("user.id", "==", userInfo?.uid),
      limit(POST_PER_PAGE)
    );

    onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });

    const documentSnapshots = await getDocs(q);
    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLoadDoc(lastVisible); //set lại cái loaddoc này mới loadMore đc tiếp
  };
  // console.log(postList);
  return (
    <div>
      {/* <h1 className="dashboard-heading">Dashboard page</h1> */}
      <DashboardHeading
        title="My Posts"
        desc="Manage my posts"
      ></DashboardHeading>
      <div className="flex justify-end py-4">
        <input
          type="text"
          placeholder="Search....."
          className="border py-2 px-4 font-medium"
          onChange={handleInputFilter}
        />
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
          {posts.length > 0 &&
            posts.map((post) => (
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
                        navigate(`/user-update-post?id=${post.id}`)
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
        {total > posts.length && !filter && (
          <Button
            kind="ghost"
            className="mx-auto w-[200px]"
            onClick={handleLoadMorePost}
          >
            See more+
          </Button>
        )}

        {total <= posts.length && !filter && (
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

export default MyPostManage;
