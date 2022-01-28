import { Box, Grid } from "@mui/material";
import React from "react";
import LeaveCards from "../../scene/Leave/LeaveCards";
import { getUserInfo } from "../../utils";
import ReactDataGrid from "./UserLeave/ReactDataGrid";
import AdminLeaveTable from "../Leave/AdminLeave/AdminLeaveTable";

const cardStaticData = [
  {
    title: "Available Leave",
    subTitle: "12",
  },
];

const LeaveContainer = () => {
  return (
    <Box p={2} sx={{ flexGrow: "1", width: "100%" }}>
      <Grid container spacing={3}>
        <Grid item container spacing={3}>
          {cardStaticData.map((card, index) => {
            return (
              <Grid key={index} item xs={12} sm>
                <LeaveCards card={card} />
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          {getUserInfo()?.user_role === "Admin" ? (
            <AdminLeaveTable />
          ) : (
            <ReactDataGrid />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeaveContainer;
