import { LoadingButton } from "@mui/lab";
import { MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field, Form, Formik } from "formik";
import React from "react";
import { showNotification } from "../../../helper/Notifications";
import { useUpdateLeaveMutation } from "../../../RTK-Query/appApi";
import MobileDatePicker from "../../../shared/DateRangePicker/MobileDatePicker";

const PartialApproved = ({ data, ...props }) => {
  const [updateLeave, { isLoading: AdminLeaveUpdate }] =
    useUpdateLeaveMutation();

  const PLdateLimit = {
    minDate: new Date(data.from_date),
    maxDate: new Date(data.to_date),
  };
  var initialState = {
    leave_day_type: data.leave_day_type,
    from_date: data.from_date,
    to_date: data.to_date,
    number_of_days: data.number_of_days,
  };
  const useStyle = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(3),
    },
  }));
  const calsses = useStyle();
  return (
    <Paper className={calsses.paper}>
      <Formik
        initialValues={initialState}
        onSubmit={async (values) => {
          if (values == initialState) {
            showNotification(
              "you haven't made any changes, so leave status will be as before.",
              "error"
            );
            return props.Close();
          }

          try {
            let laveValues = {
              leave_id: data._id,
              status: { status: "partial-approve", ...values },
              approved_by_id: "admin",
            };
            const res = await updateLeave(laveValues);
            res.data.status === "200" &&
              showNotification(
                "Leave as been successfully approved as Partial Leave.",
                "success"
              );
            return props.Close();
          } catch (error) {
            error.error
              ? showNotification(error.error, "error")
              : showNotification(error.data?.error, "error");
          }
        }}
      >
        {(props) => (
          <Form>
            <Stack spacing={3} maxWidth="500px" margin="auto">
              <Typography variant="h6" textAlign="center">
                Partial Leave Approval
              </Typography>
              <Field
                as={TextField}
                select
                name="leave_day_type"
                label="Leave Day Type"
                variant="filled"
                fullWidth
              >
                <MenuItem value="full">Full</MenuItem>
                <MenuItem value="half">Half</MenuItem>
              </Field>
              <Field
                as={MobileDatePicker}
                name="date"
                label="date"
                PLdateLimit={PLdateLimit}
                form={props}
                variant="filled"
                fullWidth
              />
              <Field
                as={TextField}
                name="number_of_days"
                label="Total Leave Count"
                form={props}
                variant="filled"
                disabled
                fullWidth
              />

              <LoadingButton
                style={{ marginBottom: "5%" }}
                variant="contained"
                onClick={props.submitForm}
                loading={AdminLeaveUpdate}
              >
                Submit
              </LoadingButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default PartialApproved;
