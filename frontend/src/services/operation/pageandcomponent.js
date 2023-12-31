import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../api";

//to get category page data through category id
//use the apiConnector function to create the instance of axios to send the get request to the CATALOGPAGEDATA_API
//if the response is not success then throw the error
//else return the response data

const getCatalogaPageData = async (categoryId) => {
  // console.log("Sending categoryId:", categoryId);

  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    // console.log("category id from page and component : - >", categoryId);
    const response = await apiConnector(
      "GET",
      `${catalogData.CATALOGPAGEDATA_API}?categoryId=${categoryId}`
    );

    if (!response?.data?.success)
      throw new Error("Could not Fetch Category page data");

    result = response?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};
export default getCatalogaPageData;
