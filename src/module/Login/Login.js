import React from "react";
// Formik
import { Formik, Form, Field } from "formik";
// Material ui
import CustomTextField from "../../shared/TextField/CustomTextField";
import { Avatar, Button, Card, CardActions } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import Loader from "../../shared/Loader/Loader";

import useStyles from "./style";

const Login = ({ validate, onLogin, isLoading }) => {
  const classes = useStyles();
  const initialValues = {
    email: "",
    password: "",
  };
  // Return
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onLogin}
    >
      {({ errors }) => (
        <Form>
          <div className={classes.SignInForm}>
            <Card className={classes.card}>
              <div className={classes.avatar}>
                <Avatar className={classes.icon}>
                  <LockIcon />
                </Avatar>
              </div>
              <div className={classes.form}>
                <div className={classes.input}>
                  <Field
                    name="email"
                    label="Email"
                    type="text"
                    id="email"
                    component={CustomTextField}
                  />
                  {errors.email ? (
                    <div className={classes.err}>{errors.email}</div>
                  ) : null}
                </div>
                <div className={classes.input}>
                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    component={CustomTextField}
                  />
                  {errors.password ? (
                    <div className={classes.err}>{errors.password}</div>
                  ) : null}
                </div>
              </div>
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.actions}
                  fullWidth
                  color="primary"
                >
                  {isLoading ? <Loader size={25} /> : "Login"}
                </Button>
              </CardActions>
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
