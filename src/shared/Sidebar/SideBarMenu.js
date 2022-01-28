import React from "react";

// Material
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkOff from "@mui/icons-material/WorkOff";
import Event from "@mui/icons-material/Event";

import { getUserInfo } from "../../utils";
import { EMS_ROLE } from "../../utils/role";

const SideBarMenu = () => {
  const current_user = getUserInfo();

  const Sidebar = [
    {
      name: "dashboard",
      text: "Dashboard",
      icons: <HomeIcon />,
      path: "/dashboard",
      hidden: false,
    },
    {
      name: "userList",
      text: "UserList",
      icons: <PeopleIcon />,
      path: "/users",
      hidden: ![EMS_ROLE.ADMIN, EMS_ROLE.HUMAN_RESOURCE].includes(
        current_user?.user_role?.toUpperCase()
      ),
    },
    {
      name: "leave",
      text: "Leave",
      icons: <WorkOff />,
      path: "/leave",
    },
    {
      name: "holidays",
      text: "Holidays",
      icons: <Event />,
      path: "/holidays",
    },
  ];
  return Sidebar;
};
export default SideBarMenu;
