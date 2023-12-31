import { toast } from "react-hot-toast";

// import { updateCompletedLectures } from "../../slice/viewCourseSlice";
// import { setLoading } from "../../slice/profileSlice";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../api";
// import { useDispatch } from "react-redux"
const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

// fetching all courses
//use the apiConnector function to create the instance of axios to send the get request to the GET_ALL_COURSE_API
//if the response is not success then throw the error
//else return the response data

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    // console.log("GET_ALL_COURSE_API API ERROR............", error)
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// fetching the details of a specific course
//use the apiConnector function to create the instance of axios to send the post request to the COURSE_DETAILS_API
//if the response is not success then throw the error
//else return the response data

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });
    // console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    // console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

// fetching the available course categories
//use the apiConnector function to create the instance of axios to send the get request to the COURSE_CATEGORIES_API
//if the response is not success then throw the error
//else return the response data

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    // console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    // console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  return result;
};

// add the course details
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the post request to the CREATE_COURSE_API
//if the response is not success then throw the error
//else return the response data
export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    // console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    // console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return result;
};

// edit the course details
//get the data(updated course data) and token as the parameter
//use the apiConnector function to create the instance of axios to send the put request to the EDIT_COURSE_API
//if the response is not success then throw the error
//else return the response data

export const editCourseDetails = async (data, token) => {
  // console.log("EDIT_COURSE_API ; - >", EDIT_COURSE_API);
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    // console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    // console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return result;
};

// create a section
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the post request to the CREATE_SECTION_API
//if the response is not success then throw the error
//else return the response data

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("CREATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }
    toast.success("Course Section Created");
    result = response?.data?.data;
  } catch (error) {
    // console.log("CREATE SECTION API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return result;
};

// create a subsection
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the post request to the CREATE_SUBSECTION_API
//if the response is not success then throw the error
//else return the response data

export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("CREATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }
    toast.success("Lecture Added");
    // console.log("resuilt from course detail api SUBSECTION", response);
    result = response?.data?.data;
  } catch (error) {
    // console.log("CREATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return result;
};

// update a section
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the post request to the UPDATE_SECTION_API
//if the response is not success then throw the error
//else return the response data

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Course Section Updated");
    result = response?.data?.data;
  } catch (error) {
    // console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return result;
};

// update a subsection
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the put request to the UPDATE_SUBSECTION_API
//if the response is not success then throw the error
//else return the response data
export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("UPDATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture");
    }
    toast.success("Lecture Updated");
    result = response?.data?.data;
  } catch (error) {
    // console.log("UPDATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return result;
};

// delete a section
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the delete request to the DELETE_SECTION_API
//if the response is not success then throw the error
//else return the response data

export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("DELETE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Course Section Deleted");
    // console.log("result from delete section course detailapi", response);
    result = response?.data?.data;
  } catch (error) {
    // console.log("DELETE SECTION API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return result;
};
// delete a subsection
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the delete request to the DELETE_SUBSECTION_API
//if the response is not success then throw the error
//else return the response data

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("DELETE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.data;
  } catch (error) {
    // console.log("DELETE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return result;
};

// fetching all courses under a specific instructor
//get the token as the parameter
//use the apiConnector function to create the instance of axios to send the get request to the GET_ALL_INSTRUCTOR_COURSES_API
//if the response is not success then throw the error
//else return the response data

export const fetchInstructorCourses = async (token) => {
  let result = [];
  // const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("INSTRUCTOR COURSES API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  // toast.dismiss(toastId)
  return result;
};

// delete a course
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the delete request to the DELETE_COURSE_API
//if the response is not success then throw the error
//else return the response data

export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Course Deleted");
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
};

// get full details of a course
//get the courseId and token as the parameter
//use the apiConnector function to create the instance of axios to send the post request to the GET_FULL_COURSE_DETAILS_AUTHENTICATED
//if the response is not success then throw the error
//else return the response data

export const getFullDetailsOfCourse = async (courseId, token) => {
  // const toastId = toast.loading("Loading...")
  // dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
    // toast.error(error.response.data.message);
  }
  // toast.dismiss(toastId)
  // dispatch(setLoading(false));
  return result;
};

// mark a lecture as complete
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the post request to the LECTURE_COMPLETION_API
//if the response is not success then throw the error
//else return the response data

export const markLectureAsComplete = async (data, token) => {
  let result = null;
  // console.log("mark complete data", data)
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    );

    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
    toast.error(error.message);
    result = false;
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return result;
};

// create a rating for course
//get the data and token as the parameter
//use the apiConnector function to create the instance of axios to send the post request to the CREATE_RATING_API
//if the response is not success then throw the error
//else return the response data

export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE RATING API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating");
    }
    toast.success("Rating Created");
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE RATING API ERROR............", error);
    toast.error(error.message);
    const errorResponse = error?.response?.data?.message;
    toast.error(errorResponse);
  }
  toast.dismiss(toastId);
  return success;
};
