import React, { useState, useEffect } from "react";
import moment from "moment";

// material
import {
  Box,
  IconButton,
  Modal,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import Loader from "../../shared/Loader/Loader";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const HoliDayModal = ({
  isEdit,
  open,
  handleClose,
  onSaveHoliday,
  holiday,
  isLoading,
}) => {
  const classes = useStyles();
  const [holidayDate, setHolidayDate] = useState("");
  const [holidayName, setHolidayName] = useState("");

  useEffect(() => {
    const date = moment(holiday?.holiday_date).format("YYYY-MM-DD") || "";
    setHolidayName(holiday?.holiday_name || "");
    setHolidayDate(date);
  }, [Object.keys(holiday).length]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className={classes.dialogTitle}
            id="modal-title"
            variant="h6"
            component="h2"
            color="primary"
          >
            {isEdit ? "Edit" : "Add"} Holiday
            <IconButton onClick={handleClose} size="large">
              <Close />
            </IconButton>
          </Typography>
          <Box className={classes.profileData}>
            <Typography className="mb-3">
              <TextField
                type="text"
                placeholder="Holiday Name"
                aria-label="Search Input"
                name="holiday_name"
                label="Holiday Name"
                id="holiday_name"
                value={holidayName}
                variant="standard"
                required
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setHolidayName(e.target.value)}
              />
            </Typography>
            <Typography>
              <TextField
                type="date"
                placeholder="Holiday Date"
                aria-label="Holiday Date"
                name="holiday_date"
                label="Holiday Date"
                id="holiday_date"
                value={holidayDate}
                variant="standard"
                required
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setHolidayDate(e.target.value)}
              />
            </Typography>
          </Box>
          <Grid className="text-right mt-4">
            <Button
              color="primary"
              onClick={() => onSaveHoliday({ holidayDate, holidayName })}
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? <Loader size={15} /> : isEdit ? "Update" : "Save"}
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
export default HoliDayModal;
