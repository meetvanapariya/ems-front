import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    padding: "2.5rem",
    minHeight: "100%",
    alignItems: "center",
    paddingTop: "8rem",
    paddingBottom: "8rem",
    flexDirection: "column",
    justifyContent: "center",
  },
  box: {
    display: "flex",
    marginTop: "1.8rem",
    justifyContent: "center",
  },
}));

export default useStyles;
