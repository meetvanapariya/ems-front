import React from 'react'
//MUI
import { Grid } from '@mui/material'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import AttachmentIcon from '@mui/icons-material/Attachment'
import useStyles from './style'
import { Divider } from '@mui/material'
import CustomTextField from '../../shared/TextField/CustomTextField'
import { Field } from 'formik'
import { Switch } from "@mui/material";

const JoiningDetails = ({ getUsetData , setFieldValue}) => {
  const changeValueProbation = (e) =>{
    setFieldValue('is_probation_period_over', e.target.checked)
  }
  const classes = useStyles()
  return (
    <>
      <Box className={classes.profileDiv}>
        <AttachmentIcon className={classes.icons}  color="Primary"/>
        <Typography variant="h6"  color="Primary">Joining Details</Typography>
      </Box>
      <Divider variant="inset" className={classes.divder} />
      <Grid container className={classes.joingDetails}>
        <Grid item xs={4}>
          <Field
            name="employment_start_date"
            label="Joining Date"
            type="date"
            id="employment_start_date"
            variant="standard"
            style={{ width: '90%' }}
            component={CustomTextField}
          />
        </Grid>
        <Grid item xs={4}>
          <Field
            name="total_experience"
            label="Total Experience"
            type="text"
            id="total_experience"
            variant="standard"
            value="3y"
            style={{ width: '90%' }}
            component={CustomTextField}
          />
        </Grid>
        <Grid item xs={4}>
          <Field
            name="prev_company"
            label="Previous Company Name"
            type="text"
            id="prev_company"
            variant="standard"
            value="N/A"
            style={{ width: '90%' }}
            component={CustomTextField}
          />
        </Grid>
        
      </Grid>
      <Grid container className={classes.personalDetails}>
        <Grid item xs={4}>
          <Field
            name="probation_period"
            label="Probation period"
            type="number"
            id="probation_period"
            variant="standard"
            style={{ width: '90%' }}
            component={CustomTextField}
          />
        </Grid>
        <Grid item sm={2}>
            <label>Is probation over</label>
            <Switch
              name="is_probation_period_over"
              type="checkbox"
              id="is_probation_period_over"
              color="primary"
              defaultChecked={getUsetData.is_probation_period_over}
              onChange={(e) => changeValueProbation(e)}
            />
          </Grid>
      </Grid>  
    </>
  )
}
export default JoiningDetails
