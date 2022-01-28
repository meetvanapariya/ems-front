// importing components for inputField
import { Autocomplete, TextField } from "@mui/material";
import MobileDatePicker from "../DateRangePicker/MobileDatePicker";

// creating list of input fields for Update Leave form
export const updateLeaveFormInputs = [
  {
    name: "leave_type",
    label: "Leave Type",
    type: "select",
    props: {
      select: true,
    },
    component: TextField,
    selectMenu: [
      { value: "casual_leave", label: "Casual Leave" },
      { value: "maternity_leave", label: "Maternity Leave" },
      { value: "medical_leave", label: "Medical Leave" },
      { value: "marriage_leave", label: "Marriage Leave" },
      // { value: "loss_of_pay", label: "Loss of Pay Leave" },
    ],
  },
  {
    name: "leave_day_type",
    label: "Leave Day Type",
    type: "select",
    props: {
      select: true,
    },
    component: TextField,
    selectMenu: [
      { value: "full", label: "Full" },
      { value: "half", label: "Half" },
    ],
  },
  {
    name: "leave_reason",
    label: "Leave Reason ",
    type: "text",
    component: TextField,
    props: {
      multiline: true,
    },
  },
  {
    name: "date",
    label: "Date",
    props: {
      isMobile: true,
      disablePast: true,
    },
    component: MobileDatePicker,
  },
  {
    name: "number_of_days",
    label: "Leave Number Day",
    component: TextField,
    props: {
      disabled: true,
    },
  },
];

// creating list of input fields for Apply Leave form
export const AddLeaveFormInputs = [
  {
    name: "leave_type",
    label: "Leave Type",
    type: "select",
    props: {
      select: true,
    },
    component: TextField,
    selectMenu: [
      { value: "casual_leave", label: "Casual Leave" },
      { value: "maternity_leave", label: "Maternity Leave" },
      { value: "medical_leave", label: "Medical Leave" },
      { value: "marriage_leave", label: "Marriage Leave" },
      // { value: "loss_of_pay", label: "Loss of Pay Leave" },
      { value: "waive-off", label: "Waive off" },
    ],
  },
  {
    name: "leave_day_type",
    label: "Leave Day Type",
    type: "select",
    props: {
      select: true,
    },
    component: TextField,
    selectMenu: [
      { value: "full", label: "Full" },
      { value: "half", label: "Half" },
    ],
  },
  {
    name: "leave_reason",
    label: "Leave Reason ",
    type: "text",
    component: TextField,
    props: {
      multiline: true,
    },
  },
  {
    name: "date",
    label: "Date",
    props: {
      isMobile: true,
      minDate: true,
    },
    component: MobileDatePicker,
  },
  {
    name: "number_of_days",
    label: "Leave Number Day",
    component: TextField,
    props: {
      disabled: true,
    },
  },
];
