import { toast } from "react-hot-toast";

import { setUser } from "../../slice/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../api";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

//to update display picture
//its returning a async function which is taking token and formdata as a parameter
//its using apiConnector function to make a instance of axios to send a put request to the UPDATE_DISPLAY_PICTURE_API
//if the response is success then it will dispatch the setUser action with the data from the response

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      console.log(
        "UPDATE_DISPLAY_PICTURE_API : - > ",
        UPDATE_DISPLAY_PICTURE_API
      );
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
      const errorResponse = error?.response?.data?.message;
      toast.error(errorResponse);
    }
    toast.dismiss(toastId);
  };
}

//to update profile
//its returning a async function which is taking token and formdata as a parameter
//its using apiConnector function to make a instance of axios to send a put request to the UPDATE_PROFILE_API
//if the response is success then it will dispatch the setUser action with the data from the response

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      console.log("UPDATE_PROFILE_API url  ; - >", UPDATE_PROFILE_API);
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response?.data?.data?.image
        ? response?.data?.data?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
      const errorResponse = error?.response?.data?.message;
      toast.error(errorResponse);
    }
    toast.dismiss(toastId);
  };
}

//to change password
//its using apiConnector function to make a instance of axios to send a post request to the CHANGE_PASSWORD_API
//if the response is success then it will show a toast with the message from the response

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Changed Successfully");
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

//to delete profile
//its using apiConnector function to make a instance of axios to send a delete request to the DELETE_PROFILE_API
//if the response is success then it will dispatch the logout action and will redirect to the home page

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Delete Profile");
      const errorResponse = error?.response?.data?.message;
      toast.error(errorResponse);
    }
    toast.dismiss(toastId);
  };
}
