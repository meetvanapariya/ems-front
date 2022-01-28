import React from 'react'
//MUI
import { Grid } from '@mui/material'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import useStyles from './style'
import { Divider } from '@mui/material'
import CustomTextField from '../../shared/TextField/CustomTextField'
import { Field } from 'formik'

const PersonalBasicDetails = ({ getUsetData }) => {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.profileDiv}>
        <PersonIcon className={classes.icons}  color="Primary"/>
        <Typography variant="h6"  color="Primary">Personal Basic Details</Typography>
      </Box>
      <Divider variant="inset" className={classes.divder} />
      <Grid container className={classes.personalDetails}>
        <Grid item sm={4}>
          <Field
            name="user_birth_date"
            label="Birth date"
            type="date"
            id="user_birth_date"
            variant="standard"
            style={{ width: '80%' }}
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm={4}>
          <Field
            name="gender"
            label="Gender"
            type="text"
            id="gender"
            variant="standard"
            value="male"
            style={{ width: '80%' }}
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm={4}>
          <Field
            name="mariatal_status"
            label="Marital Status"
            type="text"
            id="mariatal_status"
            variant="standard"
            value="single"
            style={{ width: '80%' }}
            component={CustomTextField}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.personalDetails}>
        <Grid item sm={4}>
          <Field
            name="bank_ac"
            label="Bank Account Number"
            type="text"
            id="bank_ac"
            variant="standard"
            style={{ width: '80%' }}
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm={4}>
          <Field
            name="pan_card"
            label="PAN Number"
            type="text"
            id="pan_card"
            variant="standard"
            value="83498784598457948"
            style={{ width: '80%' }}
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm={4}>
          <Field
            name="adharcard_no"
            label="Aadhar Number"
            type="text"
            id="adharcard_no"
            variant="standard"
            style={{ width: '80%' }}
            component={CustomTextField}
          />
        </Grid>
      </Grid>
    </>
  )
}
export default PersonalBasicDetails
