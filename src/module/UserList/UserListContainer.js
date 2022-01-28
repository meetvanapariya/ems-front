import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

// Internal
import UserList from "./UserList";
import { TableDataSkeleton } from "../../shared/Loader/SkeletonLoader";
import CustomCard from "../../shared/Card/CustomCard";
import {
  useGetUsersListQuery,
  useDeleteUserMutation,
} from "../../RTK-Query/appApi";
import { AlertDialog } from "../../shared/AlertDialog/AlertDialog";

const UserListContainer = ({ history }) => {
  const [params, setParams] = useState({});
  const { data, isLoading } = useGetUsersListQuery(params);
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.payload;
  // Theme
  const isDarkMode = useSelector((state) => state.common.is_darkmode);
  const cards = [
    { title: "Total User", subTitle: users?.length },
    { title: "Developers" },
    { title: "Quality Analyst" },
    { title: "Designer" },
  ];

  // Edit user Profile
  const EditUser = (userData) => {
    if (userData) {
      history.push(`/user-profile/${userData._id}`);
    }
  };
  // Delete User
  const DeleteUser = async (id) => {
    const alertMsg = {
      title: "Are you sure you want to delete user?",
      message: "",
      button1: "Confirm",
      button2: "Cancel",
      id: id,
      method: deleteUser,
    };
    AlertDialog(alertMsg);
  };

  // Search Result
  const searchHandler = (values) => {
    setParams(values);
  };
  // Clear Search Result
  const searchClearHandler = () => {
    setParams({});
  };
  const componentToBeRender = isLoading ? (
    <TableDataSkeleton
      numberOfColumn={5}
      numberOfRow={10}
      columnGap={10}
      height={50}
      variant="rectangular"
      animation="wave"
      skeletonType="tableView"
    />
  ) : (
    <UserList
      users={users}
      EditUser={EditUser}
      DeleteUser={DeleteUser}
      isDarkMode={isDarkMode}
      searchHandler={searchHandler}
      searchClearHandler={searchClearHandler}
    />
  );
  return (
    <Box p={2} sx={{ flexGrow: "1" }}>
      <Grid container spacing={3}>
        <Grid item container spacing={3}>
          {cards?.map((card, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <CustomCard card={card} />
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          {componentToBeRender}
        </Grid>
      </Grid>
    </Box>
  );
};

export default withRouter(UserListContainer);
