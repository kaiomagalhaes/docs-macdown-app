import * as axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001'
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {

  // Do something before request is sent
  return config;
}, function (error) {

  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {

  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // return Promise.reject(error);

  return {data: {error: true, message: error.message, errorObject: error}}
});

// Alter defaults after instance has been created
axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('AUTH_TOKEN');

export default axiosInstance;
