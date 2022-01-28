import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import DoneIcon from "@mui/icons-material/Done";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Box, capitalize, Typography } from "@mui/material";
import { useGetCurrentLastLeavesQuery } from "../../../RTK-Query/appApi";

const useStyles = makeStyles((theme) => ({
  subHeader: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
}));

const EmployeeLeaveTable = () => {
  const classes = useStyles();
  const { data } = useGetCurrentLastLeavesQuery();
  const filteredItems = data?.payload || [];
  const darkMode = useSelector((state) => state.common.is_darkmode);

  const columns = [
    {
      name: "Name",
      selector: (row) => row["username"],
      sortable: false,
    },

    {
      name: "Date",
      selector: (row) => row["from_date"],
      sortable: false,
      cell: (d) => {
        const fromDate = moment(d.from_date).format("DD-MM-YYYY");
        const toDate = moment(d.to_date).format("DD-MM-YYYY");
        return `${fromDate} - ${toDate}`;
      },
    },

    {
      name: "Status",
      selector: (row) => row["status"],
      sortable: false,
      cell: (d) => {
        return capitalize(d.status);
      },
      grow: 0.5,
    },
    {
      name: "Manager",
      selector: (row) => row["from_date"],
      sortable: false,

      cell: (d) => {
        return <DoneIcon style={{ color: "green" }} color="primary" />;
      },
      grow: 0.5,
      omit: true,
    },
    {
      name: "Admin",
      selector: (row) => row["from_date"],
      sortable: false,
      hide: true,
      cell: (d) => {
        return <DoneIcon style={{ color: "green" }} color="primary" />;
      },
      grow: 0.5,
      omit: true,
    },

    {
      name: "Today",
      selector: (row) => row["from_date"],
      sortable: false,
      cell: (d) => {
        return <DoneIcon style={{ color: "green" }} color="primary" />;
      },
      grow: 0.5,
      omit: true,
    },
  ];

  const subHeaderComponent = useMemo(() => {
    return (
      <Box
        sx={{ display: "flex", flexGrow: "1", justifyContent: "space-between" }}
      >
        <Typography className={classes.subHeader} variant="h6" color="primary">
          {/* <AirplanemodeActiveIcon fontSize="large" className={classes.icon} />{" "} */}
          Employee on Leave for next 15 days
        </Typography>
      </Box>
    );
  }, [filteredItems]);

  return (
    <>
      <DataTable
        data={filteredItems}
        columns={columns}
        className={classes.table_wrapper}
        defaultSortAsc={true}
        className={classes.table_wrapper}
        noDataComponent="No Data Available"
        theme={darkMode ? "dark" : "light"}
        subHeader
        subHeaderComponent={subHeaderComponent}
        persistTableHead={true}
      />
    </>
  );
};

export default EmployeeLeaveTable;
