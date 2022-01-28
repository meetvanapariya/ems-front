import React from "react";
import { useSelector } from "react-redux";

import { getUserInfo } from "../../utils";

const ProfileMenu = () => {
  const current_user = getUserInfo();
  const menu = [
    {
      name: "profile",
      text: "Profile",
      path: `/user-profile/${current_user?.user_id}`,
      hidden: false,
    },
    {
      name: "logout",
      text: "Logout",
      path: "/login",
      hidden: false,
    },
  ];
  return menu;
};
export default ProfileMenu;
