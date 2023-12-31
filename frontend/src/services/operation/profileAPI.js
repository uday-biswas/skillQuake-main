import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slice/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

//function to get user details
//it takes token and navigate as parameter
//its returning a async function which takes dispatch as parameter
//its using apiConnector function to make to create a instance of axios to send the get request to the GET_USER_DETAILS_API
//if the response is not success then it will throw a error
//if the response is success then it will dispatch the setUser action with the response data
//if there is any error then it will dispatch the logout action.
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
      const errorResponse = error?.response?.data?.message;
      console.log(`tost error: - > ${errorResponse}`);
      toast.error(errorResponse);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

//function to get user enrolled courses
//it uses apiConnector function to create a instance of axios to send the get request to the GET_USER_ENROLLED_COURSES_API
//if the response is not success then it will throw a error
//if the response is success then it will return the response data

export async function getUserEnrolledCourses(token) {
  // console.log("token send from getUserEnrolledCourses", token);
  // const toastId = toast.loading("Loading...")
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(
      "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      response
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    // toast.error("Could Not Get Enrolled Courses")
    const errorResponse = error?.response?.data?.message;
    console.log(`tost error: - > ${errorResponse}`);
    toast.error(errorResponse);
  }
  // toast.dismiss(toastId)
  return result;
}

//function to get instructor data
//it uses apiConnector function to create a instance of axios to send the get request to the GET_INSTRUCTOR_DATA_API
//if the response is not success then it will throw a error
//if the response is success then it will return the response data

export async function getInstructorData(token) {
  // const toastId = toast.loading("Loading...")
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error);
    toast.error("Could Not Get Instructor Data");
    const errorResponse = error?.response?.data?.message;
    console.log(`tost error: - > ${errorResponse}`);
    toast.error(errorResponse);
  }
  // toast.dismiss(toastId)
  return result;
}
