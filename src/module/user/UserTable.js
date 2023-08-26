import React from "react";
import { useState } from "react";
import Table from "../../components/table/Table";
import { useEffect } from "react";
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
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { useNavigate } from "react-router-dom";
import { userRole, userStatus } from "../../utils/constants";
import LabelStatus from "../../components/label/LabelStatus";
import { deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import Button from "../../components/button/Button";
const USER_PER_PAGE = 2;
const UserTable = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLoadDoc] = useState();
  const [total, setTotal] = useState(0);

  const handleLoadMoreUser = async () => {
    const nextRef = query(
      collection(db, "users"),
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
      setUserList([...userList, ...results]);
    });

    const documentSnapshots = await getDocs(nextRef);
    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLoadDoc(lastVisible);
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");

      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));

      //phục vụ loadmore
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLoadDoc(lastVisible);

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
    }
    fetchData();
  }, [filter]);

  const renderLableRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "MOD";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };

  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);

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
        await deleteDoc(colRef); //thực hiện xóa
        // await deleteUser(user); phải sử dụng fireStore admin mới xóa được
        Swal.fire("Deleted!", "Your User has been deleted.", "success");
      }
    });

    // toast.success("Delete User successfully");
  };
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  const handleHideUser = async () => {
    const colRef = collection(db, "users");
    onSnapshot(query(colRef, limit(USER_PER_PAGE)), (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });

    const documentSnapshots = await getDocs(
      query(colRef, limit(USER_PER_PAGE))
    );
    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLoadDoc(lastVisible); //set lại cái loaddoc này mới loadMore đc tiếp
  };

  const renderLableStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">BAN</LabelStatus>;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="flex flex-col py-4 gap-x-5 gap-y-5 md:flex md:justify-end md:py-4 md:gap-x-5 md:flex-row">
        <input
          type="text"
          placeholder="Search....."
          className="border py-2 px-4 font-medium"
          onChange={handleInputFilter}
        />
        <Button className="p-4" to="/manage/add-user">
          Add New User
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>FullName</th>
            <th>UserName</th>
            <th>Email Address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
                <td className="whitespace-nowrap">
                  <div className="flex item-center gap-x-3">
                    <img
                      src={user?.avatar}
                      alt="img"
                      className="flex-shrink-0 w-10 h-10 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3>{user?.fullname}</h3>
                      <time className="text-sm text-gray-300">
                        {new Date(
                          user?.createdAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>{renderLableStatus(Number(user?.status))}</td>
                <td>{renderLableRole(Number(user?.role))}</td>
                <td>
                  <div className="flex iten-center gap-x-3">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-user?id=${user.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(user)}
                    ></ActionDelete>{" "}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > userList.length ? (
        <div className="mt-10 flex justify-center">
          <Button
            kind="ghost"
            className="p-[10px] w-[200px]"
            onClick={handleLoadMoreUser}
          >
            See More+
          </Button>
        </div>
      ) : (
        <div className="mt-10 flex justify-center">
          <Button
            kind="ghost"
            className="p-[10px] w-[200px]"
            onClick={handleHideUser}
          >
            Hide
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
