import { Box, MenuItem, Paper, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { makeStyles } from "@mui/styles";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useUpdateLeaveMutation } from "../../RTK-Query/appApi";
import { showNotification } from "../../helper/Notifications";
import { updateLeaveFormInputs } from "./inputData";

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

const UpdateLeave = ({ location, history }) => {
  const [updateLeave, { isLoading }] = useUpdateLeaveMutation();

  const classes = useStyle();
  let initialValues = {};

  if (location.state.data) {
    var { data } = location.state;
    var { _id, ...body } = data;
    initialValues.leave_type = body.leave_type;
    initialValues.leave_reason = body.leave_reason;
    initialValues.from_date = body.from_date;
    initialValues.to_date = body.to_date;
    initialValues.number_of_days = body.number_of_days;
    initialValues.status = body.status;
    initialValues.leave_day_type = body.leave_day_type;
  }
  return (
    <Paper className={classes.paper}>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={updateLeaveValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            setUpdateLeaveData(body, values);
            let newEditedData = { leave_id: _id, ...body };
            console.log("newEditedData", newEditedData);
            handleOnsubmit(updateLeave, newEditedData, resetForm, history);
          }}
        >
          {(props) => {
            return (
              <Form>
                <Stack spacing={3}>
                  {updateLeaveFormInputs.map((input, index) => {
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
                    loading={isLoading}
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Update Leave
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

export default withRouter(UpdateLeave);

// validation schema for updateLeave form.
var updateLeaveValidationSchema = yup.object({
  leave_type: yup.string().required("Must select leave type"),
  leave_day_type: yup.string().required("Must select leave day type"),
  leave_reason: yup.string().required("Please enter reason for leave"),
  from_date: yup.date().nullable().required("Please enter From date"),
  to_date: yup.date().nullable().required("Please enter To date"),
});

// setter function for updateLeave data.
var setUpdateLeaveData = (body, values) => {
  body.leave_reason = values.leave_reason;
  body.leave_type = values.leave_type;
  body.status = values.status;
  body.from_date = values.from_date;
  body.to_date = values.to_date;
  body.leave_day_type = values.leave_day_type;
  body.number_of_days = values.number_of_days;
  body.date = [values.from_date, values.to_date];
};

// handle onSubmit for updateLeave form.
var handleOnsubmit = async (updateLeave, newEditedData, resetForm, history) => {
  try {
    const res = await updateLeave(newEditedData).unwrap();
    if (res.status === "200") {
      showNotification(res.message, "success");
      resetForm({});
      history.goBack();
    }
  } catch (err) {
    err.error
      ? showNotification(err.error, "error")
      : showNotification(err.data?.error, "error");
  }
};
