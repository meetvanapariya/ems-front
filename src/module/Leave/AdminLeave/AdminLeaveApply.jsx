import React from "react";
import {
  Autocomplete,
  Box,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@mui/styles";
import { useGetUsersQuery } from "../../../RTK-Query/appApi";
import { useAddLeaveMutation } from "../../../RTK-Query/appApi";
import { LoadingButton } from "@mui/lab";
import { showNotification } from "../../../helper/Notifications";
import { AddLeaveFormInputs } from "../../../shared/Modal/inputData";

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
}));

const AdminLeaveApply = (props) => {
  const { data } = useGetUsersQuery();
  const [addLeave, { isLoading: addIsloading }] = useAddLeaveMutation();
  const classes = useStyle();

  let initialValues = {};
  initialValues.username = "";
  initialValues.leave_type = "";
  initialValues.leave_reason = "";
  initialValues.from_date = new Date();
  initialValues.to_date = null;
  initialValues.status = "";
  initialValues.leave_day_type = "";
  initialValues.number_of_days = "";
  var users;
  if (data) {
    users = getUniqueUsers(data.payload);
    console.log("users", users);
  }
  var options = users
    ? users?.map((user) => {
        return user.username;
      })
    : [];
  console.log("oprions", options);
  const flatProps = {
    options,
  };

  return (
    <Paper className={classes.paper}>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={addLeaveValidationSchema}
          onSubmit={(values, { resetForm }) => {
            setLeaveDate(values, users);
            handleOnSubmit(addLeave, values, resetForm, props.Close);
          }}
        >
          {(props) => {
            return (
              <Form>
                <Stack spacing={3}>
                  <Autocomplete
                    {...flatProps}
                    disablePortal
                    name="username"
                    ListboxProps={{
                      style: { maxHeight: "15rem" },
                      position: "bottom-start",
                    }}
                    onChange={(e, value) =>
                      props.setFieldValue("username", value ? value : "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        fullWidth
                        label="Employee Name"
                        error={Boolean(
                          props.errors?.username && props.touched?.username
                        )}
                        helperText={
                          props.errors.username &&
                          props.touched.username &&
                          props.errors.username
                        }
                      />
                    )}
                  />

                  {AddLeaveFormInputs.map((input, index) => {
                    return (
                      <Field
                        key={index}
                        form={props}
                        error={Boolean(
                          props?.touched[input.name] &&
                            props?.errors[input.name]
                        )}
                        helperText={
                          props?.touched[input.name] &&
                          props?.errors[input.name]
                        }
                        as={input.component}
                        type={input.type}
                        name={input.name}
                        label={input.label}
                        fullWidth
                        variant="filled"
                        {...input.props}
                      >
                        {input.props.select &&
                          input.selectMenu.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.value}>
                                {item.label}
                              </MenuItem>
                            );
                          })}
                      </Field>
                    );
                  })}
                  <LoadingButton
                    color="primary"
                    loading={addIsloading}
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Add Leave
                  </LoadingButton>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Paper>
  );
};

export default AdminLeaveApply;

// setter function for default values
var setLeaveDate = (values, users) => {
  const selectedEmployee = users.find((i) => {
    return values.username === i.username;
  });
  values.user_id = selectedEmployee.userId;
  values.user_role = selectedEmployee.user_role;
  values.status = "new";
  values.remaining_leave = "";
  values.date = [values.from_date, values.to_date];
};

// handle onSubmit for addLeave
var handleOnSubmit = async (addLeave, values, resetForm, Close) => {
  try {
    const res = await addLeave(values).unwrap();
    if (res.status === "200") {
      showNotification(res?.message, "success");
      resetForm({});
      Close();
    }
  } catch (err) {
    err.error
      ? showNotification(err.error, "error")
      : showNotification(err.data?.error, "error");
  }
};

// validation schema for addLeave form
var addLeaveValidationSchema = yup.object({
  username: yup.string().required("Please enter employee name"),
  leave_type: yup.string().required("Must select leave type"),
  leave_day_type: yup.string().required("Must select leave day type"),
  leave_reason: yup.string().required("Please enter reason for leave"),
  from_date: yup.date().nullable().required("Please enter From date"),
  to_date: yup.date().nullable().required("Please enter To date"),
});

const getUniqueUsers = (data) => {
  const userArray = data?.map((option) => {
    return {
      username: option.username,
      userId: option._id,
      user_role: option.user_role,
    };
  });
  return userArray;
};
