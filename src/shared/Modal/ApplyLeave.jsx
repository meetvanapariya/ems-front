import React from "react";
import { Box, MenuItem, Paper, Stack } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@mui/styles";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useAddLeaveMutation } from "../../RTK-Query/appApi";
import { getUserInfo } from "../../utils";
import { showNotification } from "../../helper/Notifications";
import { AddLeaveFormInputs } from "./inputData";
import { LoadingButton } from "@mui/lab";

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    width: "500px",
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
}));

const ApplyLeave = ({ history }) => {
  const [addLeave, { isLoading }] = useAddLeaveMutation();
  const classes = useStyle();

  let initialValues = {};
  initialValues.leave_type = "";
  initialValues.leave_reason = "";
  initialValues.form_date = null;
  initialValues.to_date = null;
  initialValues.status = "";
  initialValues.leave_day_type = "";
  initialValues.number_of_days = "";

  return (
    <Paper className={classes.paper}>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={addLeaveValidationSchema}
          onSubmit={(values, { resetForm }) => {
            setLeaveDate(values);
            handleOnSubmit(addLeave, values, resetForm, history);
          }}
        >
          {(props) => {
            return (
              <Form>
                <Stack spacing={3}>
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
                            if (item.value === "waive-off") {
                              return null;
                            }
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
                    loading={isLoading}
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

export default withRouter(ApplyLeave);

// setter function for default values
var setLeaveDate = (values) => {
  values.user_id = getUserInfo().user_id;
  values.username = getUserInfo().username;
  values.user_role = getUserInfo().user_role;
  values.status = "new";
  values.remaining_leave = "";
  values.date = [values.from_date, values.to_date];
};

// handle onSubmit for addLeave
var handleOnSubmit = async (addLeave, values, resetForm, history) => {
  try {
    const res = await addLeave(values).unwrap();
    if (res.status === "200") {
      showNotification(res?.message, "success");
      resetForm({});
      history.goBack();
    }
  } catch (err) {
    console.log("err", err);
    err.error
      ? showNotification(err.error, "error")
      : showNotification(err.data?.error.message, "error");
  }
};

// validation schema for addLeave form
var addLeaveValidationSchema = yup.object({
  leave_type: yup.string().required("Must select leave type"),
  leave_day_type: yup.string().required("Must select leave day type"),
  leave_reason: yup.string().required("Please enter reason for leave"),
  from_date: yup.date().nullable().required("Please enter From date"),
  to_date: yup.date().nullable().required("Please enter To date"),
});
