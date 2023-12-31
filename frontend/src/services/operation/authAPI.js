import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slice/authSlice";
import { setUser } from "../../slice/profileSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

//for sending otp to the email and navigating to the verify otp page
//during the return statement
//dispatch the loading state to true using the setLoading reducer
//use the apiConnector function to create a axios instance and send the POST request to the SENDOTP_API
//then if the response is successful, dispatch the loading state to false and navigate to the verify otp page
//else throw an error

const sendOtp = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    // console.log("tost id : - >", toastId);
    try {
      dispatch(setLoading(true));
      // console.log("email : - >", email);
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      });
      // console.log("SENDOTP API RESPONSE............", response);
      // console.log(response.data.success);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      // console.log("SENDOTP API ERROR............", error);
      const errorResponse = error?.response?.data?.message;
      toast.error("Could Not Send OTP");
      toast.error(errorResponse);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

//for signing up the user
//during the return statement
//get the accountType, firstName, lastName, email, password, confirmPassword, otp, navigate as parameters
//dispatch the loading state to true using the setLoading reducer
//use the apiConnector function to create a axios instance and send the POST request to the SIGNUP_API
//then if the response is successful, dispatch the loading state to false and navigate to the login page
//else throw an error

const signUp = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    console.log("signup tost id", toastId);
    dispatch(setLoading(true));
    try {
      // console.log(
      //   "signup details",
      //   accountType,
      //   firstName,
      //   lastName,
      //   email,
      //   password,
      //   confirmPassword,
      //   otp
      // );
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      // console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      // console.log("SIGNUP API ERROR............", error);
      const errorResponse = error?.response?.data?.message;
      // console.log(`tost error: - > ${errorResponse}`);
      toast.error(errorResponse);
      toast.error("NOT ABLE TO SIGNUP");

      // navigate("/signup")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

//for logging in the user
//during the return statement
//get the email, password, navigate as parameters
//dispatch the loading state to true using the setLoading reducer
//use the apiConnector function to create a axios instance and send the POST request to the LOGIN_API
//if the response is false, throw an error
//set the user image from third api dicebear, if the user image is not present in the response
//put the token and user details in the local storage
//dispatch the token and user details to the state and navigate to the dashboard/my-profile page

const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      // console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user, image: userImage }));

      navigate("/dashboard/my-profile");
    } catch (error) {
      // console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
      const errorResponse = error?.response?.data?.message;
      toast.error(errorResponse);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

//for resetting the password
//during the return statement
//get the email, setEmailSent as parameters
//dispatch the loading state to true using the setLoading reducer
//use the apiConnector function to create a axios instance and send the POST request to the RESETPASSTOKEN_API
//if the response is false, throw an error
//dispatch the loading state to false and set the setEmailSent to true

const getPasswordResetToken = (email, setEmailSent) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      // console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      // console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
      const errorResponse = error?.response?.data?.message;
      toast.error(errorResponse);
    }
    dispatch(setLoading(false));
  };
};

//for resetting the password
//during the return statement
//get the password, confirmPassword, (reset)token as parameters
//dispatch the loading state to true using the setLoading reducer
//use the apiConnector function to create a axios instance and send the POST request to the RESETPASSWORD_API
//if the response is false, throw an error
//dispatch the loading state to false and set the setEmailSent to true

const resetPassword = (password, confirmPassword, token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      // console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    } catch (error) {
      // console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
      const errorResponse = error?.response?.data?.message;
      toast.error(errorResponse);
    }
    dispatch(setLoading(false));
  };
};

//for logging out the user
//during the return statement
//dispatch the token and user details to null, clear the local storage and navigate to the home page

const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(resetCart())
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
};

export { sendOtp, signUp, login, logout, getPasswordResetToken, resetPassword };
