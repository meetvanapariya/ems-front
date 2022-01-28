import React from "react";
import {
  Avatar,
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  useGetLeavesQuery,
  useUpdateLeaveMutation,
} from "../../../RTK-Query/appApi";
import { camelCaseConvertor, getUserInfo } from "../../../utils";
import { Adjust } from "@mui/icons-material";
import { modal } from "../../../shared/Modal/CustomModal";
import PartialApproved from "./PartialApproved";
import { showNotification } from "../../../helper/Notifications";

const useData = () => {
  const { user_id } = getUserInfo();
  const {
    isError: isLeaveError,
    isFetching: isLeaveFetching,
    isSuccess: isLeaveSuccess,
    isLoading: isLeaveLoading,
    error: LeaveError,
    data: leavesArray,
  } = useGetLeavesQuery(user_id);

  var data = leavesArray?.payload?.userLeave;
  const [updateLeave, { isLoading: AdminLeaveUpdate }] =
    useUpdateLeaveMutation();

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row["username"],
      sortable: true,
      grow: 2,
      cell: (d) => {
        function generateRandomColor() {
          var color = [
            "#bebebe",
            "#b4a0f3",
            "#fd5217",
            "#7616fc",
            "#6aaaf5",
            "#49ec46",
            "#ec9ed3",
            "#e1f8b7",
          ];

          return (color = color[Math.floor(Math.random() * color.length)]); //pluck a random color;
        }
        function stringAvatar(name) {
          return {
            style: {
              background: generateRandomColor(),
            },
            children: `${name.charAt(0)}`,
          };
        }

        return (
          <Box
            style={{
              padding: "10px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar {...stringAvatar(d.username)} />

            <Box
              style={{
                marginLeft: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                style={{ margin: "0" }}
                color="inherit"
                variant="subtitle1"
              >
                {camelCaseConvertor(d.username)}
              </Typography>
              {d.user_role}
            </Box>
          </Box>
        );
      },
    },
    {
      name: "Leave Type",
      selector: (row) => row["leave_type"],
      sortable: true,
      cell: (d) => {
        const leaveTypes = {
          casual_leave: "Casual Leave",
          maternity_leave: "Maternity Leave",
          medical_leave: "Medical Leave",
          loss_of_pay: "Loss of Pay",
        };
        return leaveTypes[d.leave_type];
      },
    },
    {
      name: "From",
      selector: (row) => row["from_date"],
      sortable: true,
      cell: (d) => {
        const newDate = new Date(d.from_date).toLocaleDateString("en-ZA", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        return newDate;
      },
    },
    {
      name: "To",
      selector: (row) => row["to_date"],
      sortable: true,
      cell: (d) => {
        const newDate = new Date(d.to_date).toLocaleDateString("en-ZA", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        return newDate;
      },
    },
    {
      name: "Days",
      selector: (row) => row["number_of_days"],
      sortable: true,
    },
    {
      name: "Day Type",
      selector: (row) => row["leave_day_type"],
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row["leave_reason"],
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Leave Status",
      selector: (row) => row["status"],
      sortable: true,
      grow: 2,
      cell: (d) => {
        var statusValue;
        typeof d.status === "object"
          ? (statusValue = d.status.status)
          : (statusValue = d.status);

        return (
          <form>
            <FormControl>
              <Select
                variant="standard"
                value={statusValue}
                onChange={async (e) => {
                  e.stopPropagation();
                  try {
                    if (e.target.value === "partial-approve") {
                      return modal(true, <PartialApproved data={d} />);
                    }
                    let data = {
                      leave_id: d._id,
                      status: e.target.value,
                      approved_by_id: "admin",
                    };
                    const res = await updateLeave(data);
                    res.data.status === "200" &&
                      showNotification(
                        `Leave as been successfully approved as ${data.status.toUpperCase()}.`,
                        "success"
                      );
                  } catch (error) {
                    error.error
                      ? showNotification(error.error, "error")
                      : showNotification(error.data?.error, "error");
                  }
                }}
              >
                <MenuItem value="new">
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Adjust style={{ color: "orange", marginRight: "10px" }} />
                    New
                  </Box>
                </MenuItem>
                <MenuItem value="partial-approve">
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Adjust
                      style={{ color: "lightblue", marginRight: "10px" }}
                    />
                    Partial-approve
                  </Box>
                </MenuItem>
                <MenuItem value="rejected">
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Adjust style={{ color: "red", marginRight: "10px" }} />
                    Rejected
                  </Box>
                </MenuItem>
                <MenuItem value="approved">
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Adjust style={{ color: "green", marginRight: "10px" }} />
                    Approved
                  </Box>
                </MenuItem>
                <MenuItem value="waive-off">
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Adjust style={{ color: "yellow", marginRight: "10px" }} />
                    Waive off
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </form>
        );
      },
    },
  ];

  return {
    data,
    columns,
    isLeaveError,
    isLeaveFetching,
    isLeaveSuccess,
    isLeaveLoading,
    LeaveError,
    AdminLeaveUpdate,
  };
};

export default useData;
