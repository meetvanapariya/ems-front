import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";

const CustomDateRangePicker = ({
  isMobile,
  setFormData,
  formData,
  setClearButton,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        {isMobile ? (
          <MobileDateRangePicker
            startText="From"
            endText="To"
            clearable
            inputFormat="dd/MM/yyyy"
            mask={"__/__/____"}
            value={[formData.from_date, formData.to_date]}
            onChange={(newValue) => {
              setFormData({
                ...formData,
                from_date: newValue[0],
                to_date: newValue[1],
              });
              setClearButton(false);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} variant="filled" />
                <Box sx={{ mx: 2 }}> </Box>
                <TextField {...endProps} variant="filled" />
              </React.Fragment>
            )}
          />
        ) : (
          <DesktopDateRangePicker
            startText="From"
            endText="To"
            value={[formData.from_date, formData.to_date]}
            autoOk={true}
            onChange={(newValue) => {
              setFormData({
                ...formData,
                from_date: newValue[0],
                to_date: newValue[1],
              });
              setClearButton(false);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} variant="filled" />
                <Box sx={{ mx: 1 }} />
                <TextField {...endProps} variant="filled" />
              </React.Fragment>
            )}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker;
