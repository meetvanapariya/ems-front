import React, { useState, useRef } from 'react'
//MUI
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import useStyles from './style'
import { Divider } from '@mui/material'
import CustomTextField from '../../shared/TextField/CustomTextField'
import { Field } from 'formik'
import { IMG_STORAGE_URL } from '../../utils'

// custom component
import ProfileUpload from './ProfileUpload'

const Profile = ({ getUsetData, setFieldValue }) => {
  const classes = useStyles()
  const inputRef = useRef();
  return (
    <>
      <Box className={classes.profileDiv}>
        <PersonIcon className={classes.icons}  color="Primary"/>
        <Typography variant="h6"  color="Primary">Profile</Typography>
      </Box>
      <Divider variant="inset" className={classes.divder} />
      <Box className={classes.profileDetails}>
        <Box className={classes.avatarDiv}>
          <ProfileUpload setFieldValue={setFieldValue} profileImage={`${IMG_STORAGE_URL}${encodeURI(getUsetData.profile_image)}`}  />
          <Typography variant="h4">
            {getUsetData.first_name} {getUsetData.last_name}
          </Typography>
        </Box>
        <Box className={classes.profileData}>
          <Typography>
            <Field
              name="EMP_ID"
              label="EMPID"
              type="text"
              id="EMP_ID"
              variant="standard"
              fullWidth
              component={CustomTextField}
            />
          </Typography>
          <Typography>
            <Field
              name="user_department"
              label="Department"
              type="text"
              id="user_department"
              variant="standard"
              component={CustomTextField}
            />
          </Typography>
          <Typography>
            <Field
              name="email"
              label="Email"
              type="email"
              id="email"
              variant="standard"
              component={CustomTextField}
            />
          </Typography>
          <Typography>
            <Field
              name="personal_email"
              label="Personal Email"
              type="email"
              id="personal_email"
              variant="standard"
              value="meet@gmail.com"
              disabled
              component={CustomTextField}
            />
          </Typography>
        </Box>
      </Box>
    </>
  )
}
export default Profile
