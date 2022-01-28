import { IMG_BASE_URL } from "../config";

export const noop = () => {};

// Set Token To LocalStorage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};
// Get Token From LocalStorage
export const getToken = () => {
  return localStorage.getItem("token");
};
// Remove Token
export const removeToken = () => {
  localStorage.removeItem("token");
};
// Set User Data To LocalStorage
export const setUserInfo = (user) => {
  localStorage.setItem("user", user);
};
// Get User Data From LocalStorage
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("user"));
};
// Remove User Data
export const removeUserInfo = () => {
  localStorage.removeItem("user");
};
// Convert Word into Camel Case
export const camelCaseConvertor = (words) => {
  if (words)
    return words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
};

// Get img from multer storage
export const IMG_STORAGE_URL = IMG_BASE_URL;
