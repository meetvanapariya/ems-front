import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import { useGetServerTimeQuery } from "../../RTK-Query/appApi";

const MobileDatePicker = ({ form, ...props }) => {
  console.log(form);
  const { data: serverTime } = useGetServerTimeQuery();
  const date = getMaxDays(form);
  const days = daysCount(form);

  if (serverTime) {
    var minLimit = getMinDays(serverTime.dateTime);
  }
  var limit;
  if (props.PLdateLimit) {
    limit = { ...props.PLdateLimit };
  } else {
    limit = props.minDate
      ? { maxDate: date, minDate: new Date(minLimit) }
      : { maxDate: date };
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileDateRangePicker
          startText="From"
          name={props?.name}
          {...props}
          endText="To"
          {...limit}
          inputFormat="dd/MM/yyyy"
          mask={"__/__/____"}
          clearable
          value={[form?.values?.from_date, form?.values?.to_date]}
          onChange={(value) => {
            handleOnChange(value, form, days);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField
                {...startProps}
                fullWidth
                name="from_date"
                error={Boolean(
                  form.errors?.from_date && form.touched?.from_date
                )}
                helperText={
                  form.errors.from_date &&
                  form.touched.from_date &&
                  form.errors.from_date
                }
                variant="filled"
              />
              <Box sx={{ mx: 2 }}> </Box>
              <TextField
                fullWidth
                {...endProps}
                name="to_date"
                error={Boolean(form.errors?.to_date && form.touched?.to_date)}
                helperText={
                  form.errors.to_date &&
                  form.touched.to_date &&
                  form.errors.to_date
                }
                variant="filled"
              />
            </React.Fragment>
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default MobileDatePicker;

//  getting number os days between from start date to end date.
const daysCount = (form) => {
  if (form?.values?.from_date && form?.values?.to_date) {
    if (form?.values?.from_date === form?.values?.to_date) {
      return 1;
    }
    var oneDay = 24 * 60 * 60 * 1000;
    var start = new Date(form?.values?.from_date);
    var end = new Date(form?.values?.to_date);
    var days = Math.round(Math.abs(start - end) / oneDay);
    return days + 1;
  }
};

// getting max day count from start date.
const getMaxDays = (form) => {
  var date;
  if (form?.values?.from_date === null) {
    date = null;
    return date;
  } else {
    date = new Date(form?.values?.from_date);
  }
  return date.setDate(date?.getDate() + 23);
};

// getting min day count from server's current Date.
const getMinDays = (serverTime) => {
  var date;
  date = new Date(serverTime);
  return date.setDate(date?.getDate() - 7);
};

// input handleOnChange
const handleOnChange = (value, form, days) => {
  if (form?.values?.leave_day_type === "half") {
    console.log("hello number");
    form?.setFieldValue("number_of_days", days / 2);
  }
  if (form?.values?.leave_day_type === "full") {
    form?.setFieldValue("number_of_days", days);
  }
  form?.setFieldValue("from_date", value[0]);
  form?.setFieldValue("to_date", value[1]);
};
