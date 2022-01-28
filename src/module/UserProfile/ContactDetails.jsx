import React from 'react'
//MUI
import { Grid } from '@mui/material'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import useStyles from './style'
import { Divider } from '@mui/material'
import CustomTextField from '../../shared/TextField/CustomTextField'
import { Field } from 'formik'

const ContactDetails = ({ getUsetData }) => {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.profileDiv}>
        <ContactPhoneIcon className={classes.icons} color="Primary" />
        <Typography variant="h6" color="Primary">
          Contact Details
        </Typography>
      </Box>
      <Divider variant="inset" className={classes.divder} />
      <Grid container className={classes.contactDetails}>
        <Grid item sm={6}>
          <Field
            name="phone"
            label="Personal Phone Number"
            type="text"
            id="phone"
            variant="standard"
            style={{ width: '90%' }}
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm={6}>
          <Field
            name="alternate_mobile_no"
            label="Alternate Phone Number"
            type="text"
            id="alternate_mobile_no"
            variant="standard"
            style={{ width: '90%' }}
            component={CustomTextField}
          />
        </Grid>
      </Grid>

      <Grid container className={classes.contactDetails}>
        <Grid item sm={6}>
          <Field
            name="current_address"
            label="Current Address"
            type="text"
            id="current_address"
            variant="standard"
            style={{ width: '90%' }}
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm={6}>
          <Field
            name="permanent_address"
            label="Permanent Address"
            type="text"
            id="permanent_address"
            variant="standard"
            style={{ width: '90%' }}
            component={CustomTextField}
          />
        </Grid>
      </Grid>
    </>
  )
}
export default ContactDetails
