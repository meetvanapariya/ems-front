// Custom styles for the TimelineItem
import { Avatar, Box, Divider, Typography } from "@material-ui/core";
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { IMG_STORAGE_URL } from "../../../utils";

const useStyles = makeStyles((theme) => ({
  Avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  TimelineItem: {
    "&:before": {
      flex: "none",
    },
  },
}));

function TimelineItemm({ key, title, dateTime, lastItem, userProfileImage }) {
  const classes = useStyles();
  const userAvatar =
    userProfileImage ||
    "https://media.istockphoto.com/photos/pleasant-young-indian-woman-freelancer-consult-client-via-video-call-picture-id1300972573?b=1&k=20&m=1300972573&s=170667a&w=0&h=xuAsEkMkoBbc5Nh-nButyq3DU297V_tnak-60VarrR0=";
  return (
    <Box key={key}>
      <TimelineItem className={classes.TimelineItem}>
        <TimelineSeparator>
          <Box sx={{ margin: "5px 0px 5px 0px" }}>
            <Avatar
              className={classes.Avatar}
              alt="Remy Sharp"
              src={`${IMG_STORAGE_URL}${encodeURI(userAvatar)}`}
            />
          </Box>
          {!lastItem ? <TimelineConnector style={{ height: "40px" }} /> : null}
        </TimelineSeparator>
        <TimelineContent>
          <Box
            lineHeight={1}
            pb={1.5}
            maxWidth="30rem"
            style={{ borderBottom: ".5px solid gray" }}
          >
            <Typography variant="button" color="primary" fontWeight="regular">
              {title}
            </Typography>
            <Box mt={0.5}>
              <Typography variant="body2" color="initial">
                {moment(dateTime).format("Do MMMM YYYY")}
              </Typography>
            </Box>
          </Box>
        </TimelineContent>
      </TimelineItem>
    </Box>
  );
}

export default TimelineItemm;
