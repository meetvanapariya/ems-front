import React from "react";
import { withRouter } from "react-router-dom";

// Internal
import { REGEX } from "../../helper/validator";
import Login from "./Login";
import { setToken, setUserInfo } from "../../utils";
import { useLoginUserMutation } from "../../RTK-Query/appApi";
import useStyles from "./style";
import { showNotification } from "../../helper/Notifications";

const LoginContainer = ({ history }) => {
  const classes = useStyles();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!values.email.match(REGEX.EMAIL)) {
      errors.email = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const onLogin = async (values, { resetForm }) => {
    try {
      const loginUserData = await loginUser(values).unwrap();
      if (loginUserData.status === "200") {
        setToken(loginUserData.payload.token);
        const userData = {
          user_id: loginUserData.payload._id,
          user_role: loginUserData.payload.user_role,
          username: loginUserData.payload.username,
          first_name: loginUserData.payload.first_name,
          last_name: loginUserData.payload.first_name,
        };
        setUserInfo(JSON.stringify(userData));
        history.push("/dashboard");
      }
    } catch (err) {
      showNotification(err?.data?.error, "error");
    }

    resetForm({ values: "" });
  };

  return (
    <div className={classes.loginForm}>
      <Login validate={validate} onLogin={onLogin} isLoading={isLoading} />
    </div>
  );
};
export default withRouter(LoginContainer);
