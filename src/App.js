import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import React, { Suspense } from "react";

//Suspense đi với lazy load: mở trang nào mới load trang đó chứ không load đồng bộ hết

const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const DashboardLayout = React.lazy(() =>
  import("./module/dashboard/DashboardLayout")
);
const PostAddNew = React.lazy(() => import("./module/post/PostAddNew"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const PostManage = React.lazy(() => import("./module/post/PostManage"));
const CategoryUpdate = React.lazy(() =>
  import("./module/category/CategoryUpdate")
);
const UserManage = React.lazy(() => import("./module/user/UserManage"));
const UserProfile = React.lazy(() => import("./module/user/UserProfile"));
const UserAddNew = React.lazy(() => import("./module/user/UserAddNew"));
const UserUpdate = React.lazy(() => import("./module/user/UserUpdate"));
const PostUpdate = React.lazy(() => import("./module/post/PostUpdate"));
const PostDetailsPage = React.lazy(() => import("./pages/PostDetailsPage"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const AuthorPage = React.lazy(() => import("./pages/AuthorPage"));
const CategoryManage = React.lazy(() =>
  import("./module/category/CategoryManage")
);
const CategoryAddNew = React.lazy(() =>
  import("./module/category/CategoryAddNew")
);
const PostAddNewWithUser = React.lazy(() =>
  import("./module/post/PostAddNewWithUser")
);

const DashboardLayout2 = React.lazy(() =>
  import("./module/dashboard/DashboardLayout2")
);
const PostUpdateWithUser = React.lazy(() =>
  import("./module/post/PostUpdateWithUser")
);
const MyPostManage = React.lazy(() => import("./module/post/MyPostManage"));
function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>

            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route
              path="/author/:slug"
              element={<AuthorPage></AuthorPage>}
            ></Route>

            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/user-add-post"
                element={<PostAddNewWithUser></PostAddNewWithUser>}
              ></Route>
              <Route
                path="/my-post"
                element={<MyPostManage></MyPostManage>}
              ></Route>
              <Route
                path="/user-update-post"
                element={<PostUpdateWithUser></PostUpdateWithUser>}
              ></Route>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>

              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
            </Route>

            <Route element={<DashboardLayout2></DashboardLayout2>}>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
