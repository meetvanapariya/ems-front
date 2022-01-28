import React from "react";

// Material Ui
import { Avatar, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Internal
import { camelCaseConvertor, IMG_STORAGE_URL } from "../../utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const ProfileIcon = ({
  name,
  subTitle = "",
  profileImage = "",
  greeting = "",
  typography,
}) => {
  const classes = useStyles();

  const generateRandomColor = () => {
    var color = [
      "#bebebe",
      "#b4a0f3",
      "#fd5217",
      "#7616fc",
      "#6aaaf5",
      "#49ec46",
      "#ec9ed3",
      "#e1f8b7",
    ];

    return (color = color[Math.floor(Math.random() * color.length)]); //pluck a random color;
  };
  const stringAvatar = (name) => {
    return {
      style: {
        background: generateRandomColor(),
      },
      children: `${name?.charAt(0)}`,
    };
  };
  return (
    <Box
      style={{
        padding: "10px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "20px",
      }}
    >
      {profileImage ? (
        <Avatar
          className={classes.Avatar}
          alt="Remy Sharp"
          src={`${IMG_STORAGE_URL}${encodeURI(profileImage)}`}
        />
      ) : (
        <Avatar {...stringAvatar(name.first_name)} />
      )}

      <Box
        style={{
          marginLeft: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography style={{ margin: "0" }} {...typography}>
          {greeting}{" "}
          {camelCaseConvertor(name?.first_name) +
            " " +
            (name.last_name && camelCaseConvertor(name?.last_name))}
        </Typography>
        <Typography>{subTitle}</Typography>
      </Box>
    </Box>
  );
};
export default ProfileIcon;
