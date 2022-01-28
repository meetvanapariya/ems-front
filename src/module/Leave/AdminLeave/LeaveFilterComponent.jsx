import { Close, Search } from "@mui/icons-material";
import { Button, MenuItem, Modal, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete } from "@mui/material";
import React from "react";
import { useAdminFilterLeavesMutation } from "../../../RTK-Query/appApi";
import CustomDateRangePicker from "../../../shared/DateRangePicker/CustomDateRangePicker";
import { getUserInfo } from "../../../utils";
import { showNotification } from "../../../helper/Notifications";
import { useHistory } from "react-router-dom";
import { modal } from "../../../shared/Modal/CustomModal";
import AdminLeaveApply from "./AdminLeaveApply";

const LeaveFilterComponent = ({ setLeaveArray, isAdmin, data }) => {
  const history = useHistory();
  const initialState = {
    username: "",
    status: "",
    leave_type: "",
    from_date: null,
    to_date: null,
  };

  const [clearButton, setClearButton] = React.useState(true);
  const [adminFilterLeaves, { isLoading: adminFilterIsLoading }] =
    useAdminFilterLeavesMutation();
  const [formData, setFormData] = React.useState(initialState);

  const formOnClickHandler = async () => {
    const newObject = removeEmptyData(formData);
    if (!isAdmin) {
      newObject.username = getUserInfo()?.username;
    }
    try {
      console.log("newObject", newObject);
      const res = await adminFilterLeaves(newObject);
      if (res) {
        setLeaveArray(res.data.payload);
      }
    } catch (err) {
      console.log(err);
      err?.error
        ? showNotification(err?.error, "error")
        : showNotification(err?.data?.error, "error");
    }
  };

  const clearOnClickHandler = () => {
    setFormData(initialState);
    setLeaveArray(data);
    setClearButton(true);
  };

  const formOnChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setClearButton(false);
  };

  var options = isAdmin && data ? getUniqueUsers(data) : [];
  const flatProps = {
    options,
  };

  return (
    <Stack spacing={3} direction="row" my={3} sx={{ width: "100%" }}>
      {isAdmin && (
        <Autocomplete
          {...flatProps}
          disablePortal
          id="userList"
          ListboxProps={{
            style: { maxHeight: "15rem" },
            position: "bottom-start",
          }}
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.textContent });
            setClearButton(false);
          }}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Employee Name" variant="filled" />
          )}
        />
      )}

      <TextField
        style={{ width: 200 }}
        select
        label="Leave Status"
        name="status"
        variant="filled"
        value={formData.status}
        onChange={formOnChangeHandler}
      >
        <MenuItem value="--Select--">--Select--</MenuItem>
        <MenuItem value="new">New</MenuItem>
        <MenuItem value="approved">Approved</MenuItem>
        <MenuItem value="rejected">Rejected</MenuItem>
        <MenuItem value="partial-approve">Partial Approved</MenuItem>
        <MenuItem value="waive-off">Waive off</MenuItem>
      </TextField>

      <TextField
        style={{ width: 200 }}
        select
        label="Leave Type"
        name="leave_type"
        variant="filled"
        value={formData.leave_type}
        onChange={formOnChangeHandler}
      >
        <MenuItem value="--Select--">--Select--</MenuItem>
        <MenuItem value="casual_leave">Casual Leave</MenuItem>
        <MenuItem value="maternity_leave">Maternity Leave</MenuItem>
        <MenuItem value="medical_leave">Medical Leave</MenuItem>
        <MenuItem value="loss_of_pay">Loss of Pay</MenuItem>
      </TextField>

      <CustomDateRangePicker
        setFormData={setFormData}
        isMobile={true}
        formData={formData}
        setClearButton={setClearButton}
      />

      <LoadingButton
        loading={adminFilterIsLoading}
        onClick={formOnClickHandler}
        variant="outlined"
        startIcon={<Search sx={{ fontSize: 35 }} />}
      >
        Search
      </LoadingButton>
      <Button
        onClick={clearOnClickHandler}
        variant="outlined"
        disabled={clearButton}
        startIcon={<Close sx={{ fontSize: 35 }} />}
      >
        Clear
      </Button>
      {isAdmin ? (
        <Button
          style={{ minWidth: "150px" }}
          onClick={() => {
            modal(true, <AdminLeaveApply />);
          }}
          variant="outlined"
        >
          Apply Leave
        </Button>
      ) : (
        <Button
          onClick={() => history.push("/leave/add", { state: true })}
          variant="outlined"
        >
          Apply Leave
        </Button>
      )}
    </Stack>
  );
};

export default LeaveFilterComponent;

// getting list of unique usernames for autoComplete
const getUniqueUsers = (data) => {
  const userArray = data?.map((option) => option.username);
  const options = userArray?.filter(function (item, pos) {
    return userArray?.indexOf(item) === pos;
  });
  return options;
};

// removing empty or null properties from object
const removeEmptyData = (formData) => {
  let newObject = Object.keys(formData)
    .filter(
      (k) =>
        !(
          formData[k] === null ||
          formData[k] === "" ||
          formData[k] === "--Select--"
        )
    )
    .reduce((a, k) => ({ ...a, [k]: formData[k] }), {});
  return newObject;
};
