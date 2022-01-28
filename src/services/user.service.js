import FormData from "form-data";
import apiService from "./api";

import { showNotification } from "../helper/Notifications";

export const usersApi = () => {
  const registerUser = async (
    first_name,
    last_name,
    user_role,
    user_role_id,
    current_address,
    permanent_address,
    profile_image,
    blood_group,
    EMP_ID,
    phone,
    alternate_mobile_no,
    notes,
    employment_start_date,
    employment_end_date,
    user_birth_date,
    last_login,
    user_department,
    user_designation,
    adharcard_no,
    bank_ac,
    email,
    password,
    meta
  ) => {
    try {
      const apiResponse = await apiService.post("/user/register", {
        first_name,
        last_name,
        user_role,
        user_role_id,
        current_address,
        permanent_address,
        profile_image,
        blood_group,
        EMP_ID,
        phone,
        alternate_mobile_no,
        notes,
        employment_start_date,
        employment_end_date,
        user_birth_date,
        last_login,
        user_department,
        user_designation,
        adharcard_no,
        bank_ac,
        email,
        password,
        meta,
      });
      return apiResponse.data;
    } catch (error) {
      return error.response.data;
    }
  };
  const getUsers = async () => {
    try {
      const apiResponse = await apiService.get("/user/all");
      return apiResponse;
    } catch (error) {
      if (error === undefined) error = { error: "Check your connection" };
      showNotification(error.error, "error");
      return error;
    }
  };
  const getSingleUsers = async (id) => {
    try {
      const apiResponse = await apiService.get(`/user/get/${id}`);
      return apiResponse.data;
    } catch (error) {
      if (error === undefined) error = { error: "Check your connection" };
      showNotification(error.error, "error");
      return error;
    }
  };
  const loginUser = async (email, password) => {
    try {
      const apiResponse = await apiService.post("user/login", {
        email,
        password,
      });
      return apiResponse;
    } catch (err) {
      if (err === undefined) err = { error: "Check your connection" };
      showNotification(err.error, "error");
      return err;
    }
  };
  // Delete User
  const deleteUser = async (userId) => {
    try {
      const apiResponse = await apiService.patch(`user/delete/${userId}`);
      showNotification(apiResponse.data.message, "success");
      return apiResponse;
    } catch (err) {
      if (err === undefined) err = { error: "Check your connection" };
      showNotification(err.error, "error");
      return err;
    }
  };
  // Logout User
  const logoutUser = async (user_id) => {
    try {
      const apiResponse = await apiService.post("user/logout", {
        user_id,
      });
      showNotification(apiResponse.data.message, "success");
      return apiResponse;
    } catch (err) {
      if (err === undefined) err = { error: "Check your connection" };
      showNotification(err.error, "error");
      return err;
    }
  };
  const updateUser = async (id, values, file) => {
    const {
      first_name,
      last_name,
      user_role,
      user_role_id,
      current_address,
      permanent_address,
      profile_image,
      blood_group,
      EMP_ID,
      phone,
      alternate_mobile_no,
      notes,
      employment_start_date,
      employment_end_date,
      user_birth_date,
      last_login,
      user_department,
      user_designation,
      adharcard_no,
      bank_ac,
      email,
      profile_pic,
    } = values;

    const userProfileForm = {
      first_name,
      last_name,
      user_role,
      user_role_id,
      current_address,
      permanent_address,
      profile_image,
      blood_group,
      EMP_ID,
      phone,
      alternate_mobile_no,
      notes,
      employment_start_date,
      employment_end_date,
      user_birth_date,
      last_login,
      user_department,
      user_designation,
      adharcard_no,
      bank_ac,
      email,
      profile_pic,
    };
    let formData = "";
    if (file) {
      formData = new FormData();
      formData.append("profile_pic", file);
      formData.append("userData", JSON.stringify(userProfileForm));
    }
    try {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const apiResponse = await apiService.patch(
        `/user/update/${id}`,
        formData,
        config
      );
      return apiResponse.data;
    } catch (error) {
      if (error === undefined) error = { error: "Check your connection" };
      showNotification(error.message, "error");
    }
  };
  return {
    loginUser,
    updateUser,
    getSingleUsers,
    getUsers,
    logoutUser,
    deleteUser,
    registerUser,
  };
};
