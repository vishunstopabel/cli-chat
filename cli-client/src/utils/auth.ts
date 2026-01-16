import axios from "axios";
import { getToken } from "./token.js";
import { axiosInstance } from "./axiosInstance.js";

export const checkAuthenticated = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return false;
    }
    const { data } = await axiosInstance.get("/get-user-details");
    console.log(data)
    console.log(data);
  } catch (err) {
    console.log("error in the checkauth", err);
  }
};
