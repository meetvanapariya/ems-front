import React from "react";

//MUI
import { Grid, Switch } from "@mui/material";
import useStyles from "./style";
import CustomTextField from "../../shared/TextField/CustomTextField";
import { Field } from "formik";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Divider } from "@mui/material";

const Skills = ({ form, handleAddSkill, changeValue, handleRemoveField }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.profileDiv}>
        <PersonIcon className={classes.icons} color="Primary" />
        <Typography variant="h6" color="Primary">
          Other Details
        </Typography>
      </Box>
      <Divider variant="inset" className={classes.divder} />
      <Box sx={{ margin: "50px", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleAddSkill} color="primary">
          Add Skills +
        </Button>
      </Box>
      {form?.map((item, index) => (
        <Grid
          container
          className={classes.personalDetails}
          key={`item${index}`}
        >
          <Grid item sm={4}>
            <Field
              name="name"
              label="Name"
              type="text"
              id="name"
              variant="standard"
              value={item.name}
              style={{ width: "90%" }}
              onChange={(e) => changeValue(index, e)}
              component={CustomTextField}
            />
          </Grid>
          <Grid item sm={4}>
            <Field
              name="value"
              label="value"
              type="text"
              id="value"
              variant="standard"
              style={{ width: "90%" }}
              value={item.value}
              onChange={(e) => changeValue(index, e)}
              component={CustomTextField}
            />
          </Grid>
          <Grid item sm={2}>
            <label>Only Admin</label>
            <Switch
              name="is_admin"
              type="checkbox"
              id="is_admin"
              color="primary"
              defaultChecked={item.is_admin}
              onChange={(e) => changeValue(index, e)}
            />
          </Grid>
          <Grid item sm={2}>
            <Button
              onClick={(e) => handleRemoveField(e, index)}
              color="primary"
            >
              {" "}
              X{" "}
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
export default Skills;
