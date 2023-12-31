//here firstly we are creating a axios instance and then we are creating a function
//which will take method, url, bodyData, headers, params as a parameter and then it
//will return the axios instance with the given parameters.

import axios from "axios";

const axiosInstance = axios.create({});

const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
export { apiConnector, axiosInstance };
