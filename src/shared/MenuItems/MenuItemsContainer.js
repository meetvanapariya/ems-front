import React, { useState } from "react";
import { withRouter } from "react-router-dom";

//Internal
import MenuItems from "./MenuItems";

import { useLogoutUserMutation } from "../../RTK-Query/appApi";
import { showNotification } from "../../helper/Notifications";
// Util
import { getUserInfo, removeToken, removeUserInfo } from "../../utils";
import ProfileMenu from "./ProfileMenu";

const MenuItemsContainer = ({ history }) => {
  const [logoutUser] = useLogoutUserMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const current_user_data = getUserInfo();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      const logout = await logoutUser({ user_id: current_user_data?.user_id });
      if (logout) {
        showNotification(logout?.data?.message, "success");
        removeUserInfo();
        removeToken();
        history.push("/login");
      }
    } catch (err) {
      showNotification(err.data.error, "error");
    }
  };
  return (
    <MenuItems
      ProfileMenu={ProfileMenu()}
      anchorEl={anchorEl}
      handleClick={handleClick}
      handleClose={handleClose}
      handleLogout={handleLogout}
      history={history}
    />
  );
};
export default withRouter(MenuItemsContainer);
