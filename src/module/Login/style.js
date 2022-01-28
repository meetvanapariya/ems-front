import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => {
  return {
    loginForm: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: theme.palette.background.default,
    },
    SignInForm: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
    },
    card: {
      position: "absolute",
      top: "30%",
      padding: "1.5em",
      minWidth: "400px",
    },
    avatar: {
      display: "flex",
      justifyContent: "center",
    },
    icon: {
      color: theme.palette.primary.main,
    },
    form: {
      padding: "10px",
      marginBottom: "20px",
    },
    input: {
      marginTop: "20px",
    },
    err: {
      color: theme.palette.error.main,
    },
    icon: {
      color: "#f1c40f",
      fontSize: "20px",
    },
  };
});
export default useStyles;
