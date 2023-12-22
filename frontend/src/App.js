import { Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./component/pages/AboutPage";
import AddCourse from "./component/core/dashboard/add course";
import Cart from "./component/core/dashboard/cart";
import Catalog from "./component/pages/Catalog";
import ContactPage from "./component/pages/ContactPage";
import CourseDetails from "./component/pages/CourseDetails";
import Dashboard from "./component/pages/Dashboard";
import EditCourse from "./component/core/dashboard/edit course";
import EnrolledCourses from "./component/core/dashboard/EnrollCourses";
import Error from "./component/pages/ErrorPage";
import Footer from "./component/common/Footer";
import ForgotPassword from "./component/pages/ForgotPassword";
import Header from "./component/common/Header";
import HomePage from "./component/pages/HomePage";
import Instructor from "./component/core/dashboard/instructor dashboard/Instructor";
import Login from "./component/pages/Login";
import MyCourses from "./component/core/dashboard/MyCourses";
import MyProfile from "./component/core/dashboard/MyProfile";
import PrivateRoute from "./component/core/auth/PrivateRoute";
import Settings from "./component/core/dashboard/settings";
import Signup from "./component/pages/Signup";
import UpdatePassword from "./component/pages/UpdatePassword";
import VerifyEmail from "./component/pages/VerifyEmail";
import VideoDetails from "./component/core/view course/VideoDetails";
import ViewCourse from "./component/pages/ViewCourse";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";

function App() {
  const googleClientId = `${process.env.REACT_APP_GOOGLE_CID}`;

  useEffect(() => {
    console.log("Client id google -> ", googleClientId);
  });

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div
        className="bg-richblack-900 w-screen 
       mx-auto flex flex-col font-inter  "
      >
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/update-password/:id" element={<UpdatePassword />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* add account type validations */}
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route
              path="/dashboard/edit-course/:courseId"
              element={<EditCourse />}
            />
            <Route
              path="/dashboard/enrolled-courses"
              element={<EnrolledCourses />}
            />
            <Route path="/dashboard/add-course" element={<AddCourse />} />
            <Route path="/dashboard/instructor" element={<Instructor />} />
            <Route path="/dashboard/my-courses" element={<MyCourses />} />
          </Route>

          <Route path="/catalog/:catalogName" element={<Catalog />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/dashboard/cart" element={<Cart />} />

          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            <Route
              path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
