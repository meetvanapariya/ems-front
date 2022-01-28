import React from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
// Material
import { IconButton } from "@mui/material";
import { Sort } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Internal
import UserListFilter from "./filter/UserListFilter";
import ProfileIcon from "../../shared/ProfileIcon/ProfileIcon";

const UserList = ({
  users,
  EditUser,
  DeleteUser,
  isDarkMode,
  searchHandler,
  searchClearHandler,
}) => {
  const typography = {
    color: "inherit",
    variant: "subtitle1",
  };
  // Column Data

  const columns = [
    {
      name: "Name",
      selector: (row) => row["first_name"],
      sortable: true,
      cell: (d) => (
        <ProfileIcon
          name={{ first_name: d.first_name, last_name: d.last_name }}
          typography={typography}
        />
      ),
    },
    {
      name: "EMP ID",
      selector: (row) => row["EMP_ID"],
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row["email"],
      sortable: true,
    },
    {
      name: "User Role",
      selector: (row) => row["user_role"],
      sortable: true,
    },
    {
      name: "User Designation",
      selector: (row) => row["user_designation"],
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row["phone"],
      sortable: true,
    },
    {
      name: "Action",
      sortable: false,
      selector: (row) => row["null"],
      center: true,
      cell: (userData) => {
        return (
          <div key={userData._id}>
            <IconButton onClick={() => EditUser(userData)} size="large">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => DeleteUser(userData._id)} size="large">
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <DataTable
        data={users}
        columns={columns}
        noDataComponent="No Data Available"
        theme={isDarkMode ? "dark" : "light"}
        defaultSortField="id"
        persistTableHead={true}
        sortIcon={<Sort />}
        defaultSortAsc={true}
        pagination
        highlightOnHover
        subHeader
        subHeaderComponent={
          <UserListFilter
            searchHandler={searchHandler}
            searchClearHandler={searchClearHandler}
          />
        }
      />
    </>
  );
};
export default UserList;
