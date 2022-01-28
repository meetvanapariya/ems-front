import React from "react";
import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Cancel, Delete, Edit, MoreVert } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import {
  useDeleteLeaveMutation,
  useGetLeavesQuery,
} from "../../../RTK-Query/appApi";
import { getUserInfo } from "../../../utils";
import { showNotification } from "../../../helper/Notifications";
import { AlertDialog } from "../../../shared/AlertDialog/AlertDialog";
import { modal } from "../../../shared/Modal/CustomModal";
const useData = () => {
  const {
    isError: isLeaveError,
    isFetching: isLeaveFetching,
    isSuccess: isLeaveSuccess,
    isLoading: isLeaveLoading,
    error: LeaveError,
    data: leavesArray,
  } = useGetLeavesQuery(getUserInfo().user_id);

  const history = useHistory();
  const [deleteLeave] = useDeleteLeaveMutation();

  const EditHandleClick = (data) => {
    if (data.status === "new") {
      return history.push("/leave/edit", { state: true, data: data });
    }
    showNotification("Leave can not be edit now! ", "error");
  };

  const HandleDeleteClick = (leaveData) => {
    if (leaveData.status === "delete") {
      showNotification("your leave has already deleted! ", "error");
    }
    const alertMsg = {
      title: "Are you sure you want to delete user?",
      message: "once you delete your leave you can't undo it.",
      button1: "Confirm",
      button2: "Cancel",
      id: leaveData._id,
      method: deleteLeave,
    };
    AlertDialog(alertMsg);
  };
  const data = leavesArray?.payload?.userLeave;
  const columns = [
    {
      name: "Type",
      selector: (row) => row["leave_type"],
      sortable: true,
      cell: (d) => {
        const leaveTypes = {
          casual_leave: "Casual Leave",
          maternity_leave: "Maternity Leave",
          medical_leave: "Medical Leave",
          marriage_leave: "Marriage Leave",
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
          month: "short",
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
          month: "short",
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
    // {
    //   name: "Day Type",
    //   selector: (row) => row["leave_day_type"],
    //   sortable: true,
    // },
    {
      name: "Reason",
      selector: (row) => row["leave_reason"],
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Status",
      selector: (row) => row["status"],
      sortable: true,
      cell: (d) => {
        var status;
        if (d?.status.status) {
          status = d.status.status;
        } else {
          status = d.status;
        }
        const textColour = {
          new: "orange",
          "partial-approve": "lightblue",
          rejected: "red",
          approved: "green",
          "waive-off": "yellow",
        };
        const leaveTextConversion = {
          new: "New",
          "partial-approve": "Partially Approved",
          rejected: "Rejected",
          approved: "Approved",
          "waive-off": "Approved/Waived off",
        };
        return (
          <Box
            style={{
              color: `${textColour[status]}`,
              // border: "1px solid white",
              borderRadius: "25px",
              minWidth: "100%",
              fontSize: "11px",
              // textAlign: "center",
              padding: "8px 15px",
              textTransform: "uppercase",
              fontWeight: "500",
            }}
          >
            {leaveTextConversion[status]}
            {status === "partial-approve" && (
              // <IconButton size="small" style={{ margin: "0px 0px 0px 10px" }}>
              <MoreVert
                style={{ fontSize: 15, marginLeft: "10px" }}
                onClick={() => {
                  modal(true, <StatusView data={d.status} />);
                }}
              />
              // </IconButton>
            )}
          </Box>
        );
      },
      grow: 2.2,
    },
    {
      name: "Approved by",
      selector: (row) => row["approved_by_id"],
      sortable: true,
    },
    {
      name: "Action",
      sortable: false,
      selector: (row) => row["null"],
      center: true,
      grow: 1.5,
      cell: (d) => {
        return (
          <div key={d._id}>
            {d.status === "new" && (
              <IconButton
                style={{ outline: "none" }}
                onClick={() => {
                  EditHandleClick(d);
                }}
                size="large"
              >
                <Edit color="inherit" />
              </IconButton>
            )}

            <IconButton
              style={{ outline: "none" }}
              onClick={HandleDeleteClick.bind(this, d)}
              size="large"
            >
              <Delete />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return {
    columns,
    data,
    isLeaveError,
    isLeaveFetching,
    isLeaveSuccess,
    isLeaveLoading,
    LeaveError,
  };
};

export default useData;

const StatusView = ({ data, ...props }) => {
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" color="primary">
                  Approved leave details
                </Typography>
                <IconButton
                  onClick={() => {
                    props.Close();
                  }}
                >
                  <Cancel />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Day Type</TableCell>
            <TableCell>{data.leave_day_type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">From Date</TableCell>
            <TableCell>{formatDate(data.from_date)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">To Date</TableCell>
            <TableCell>{formatDate(data.to_date)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Total Leave Count</TableCell>
            <TableCell>{data.number_of_days}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
