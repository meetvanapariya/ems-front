import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import moment from "moment";
import filter from "lodash/filter";

// material ui
import Event from "@mui/icons-material/Event";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

//api service
import { useGeUpcomingtHolidaysQuery } from "../../../RTK-Query/appApi";

const useStyles = makeStyles((theme) => ({
  subHeader: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  tableColor: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
  },
}));

const EmployeeLeaveTable = () => {
  const classes = useStyles();
  const { data } = useGeUpcomingtHolidaysQuery();
  const [holidays, setHolidays] = useState([]);

  const filteredItems = data?.payload?.upcomingHolidays || [];

  useEffect(() => {
    const filterHoliday = filter(
      filteredItems,
      (h) => moment(h.holiday_date).format("YYYY") === moment().format("YYYY")
    );
    setHolidays(filterHoliday);
  }, [filteredItems.length > 0]);

  const darkMode = useSelector((state) => state.common.is_darkmode);

  const columns = [
    {
      name: "Title",
      selector: (row) => row["holiday_name"],
      sortable: false,
    },

    {
      name: "Holiday Date",
      selector: (row) => {
        const holiday_date = moment(row["holiday_date"]).format("Do MMM YYYY");
        return holiday_date;
      },
      sortable: true,
    },
    {
      name: "Days",
      selector: (row) => {
        const days = moment(row["holiday_date"]).format("dddd");
        return days;
      },
      sortable: true,
    },
  ];

  const subHeaderComponent = useMemo(() => {
    return (
      <Box
        sx={{ display: "flex", flexGrow: "1", justifyContent: "space-between" }}
      >
        <Typography className={classes.subHeader} variant="h6" color="primary">
          <Event fontSize="large" className={classes.icon} /> UpComing Holidays
        </Typography>
      </Box>
    );
  }, [holidays]);

  return (
    <>
      <DataTable
        data={holidays}
        columns={columns}
        defaultSortAsc={true}
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
