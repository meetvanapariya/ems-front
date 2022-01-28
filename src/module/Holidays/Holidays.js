import React from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import HolidaysFilter from "./HolidaysFilter";
//ui
import { Container } from "@mui/material";
import { Sort } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { Stack } from "@mui/material";
import SkeletonLoader from "../../shared/Loader/SkeletonLoader";


const Holidays = ({ holidays, columns, isDarkMode, isHolidayLoading , onFilterHolidays , handleDateChange, selectedDate, onLoadHolidays , isclear}) => {
  return (
    <>
      <Box p={2} sx={{ flexGrow: "1", width: "100%" }}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
        {isHolidayLoading ? (
          <SkeletonLoader />
        ) : (
          <DataTable
          data={holidays}
          columns={columns}
          noDataComponent="No Data Available"
          theme={isDarkMode ? "dark" : "light"}
          defaultSortField="id"
          sortIcon={<Sort />}
          defaultSortAsc={true}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <Stack spacing={3} direction="row" my={3} sx={{ width: "100%" }}>
              <HolidaysFilter
                onFilterHolidays={onFilterHolidays}
                handleDateChange={handleDateChange}
                selectedDate={selectedDate}
                onLoadHolidays={onLoadHolidays}
                isclear={isclear}
              />
            </Stack>
          }
          persistTableHead
          />
        )}
        </Grid>
        </Grid>
        </Box>
    </>
  );
};
export default Holidays;
