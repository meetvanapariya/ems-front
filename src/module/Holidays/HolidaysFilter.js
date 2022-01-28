import React, { useEffect } from 'react'
import { Formik, Form, Field, useFormik } from 'formik'

//material ui
import { Button, Grid, Typography } from '@mui/material'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'
import DateFnsUtils from '@date-io/date-fns'
import makeStyles from '@mui/styles/makeStyles'
import { Close, Search } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Stack } from '@mui/material'

// Internal
import CustomTextField from '../../shared/TextField/CustomTextField'

const useStyles = makeStyles((theme) => {
  return {
    filterForm: {
      display: 'flex',
      width: '100%',
      marginBottom: 20,
    },
    input: {
      marginRight: '10px',
    },
    selectYear: {
      display: 'flex',
      alignItems: 'center',
    },
    datepickerInpute: {
      '& input': {
        padding: '13px',
      },
    },
  }
})

const initialValues = {
  holiday_name: '',
  month: '',
}

const monthsList = [
  {
    value: 'Jan',
    label: 'January',
  },
  {
    value: 'Feb',
    label: 'February',
  },
  {
    value: 'Mar',
    label: 'March',
  },
  {
    value: 'Apr',
    label: 'April',
  },
  {
    value: 'Aay',
    label: 'May',
  },
  {
    value: 'Jun',
    label: 'June',
  },
  {
    value: 'Jul',
    label: 'July',
  },

  {
    value: 'Aug',
    label: 'August',
  },
  {
    value: 'Sep',
    label: 'September',
  },
  {
    value: 'Oct',
    label: 'October',
  },
  {
    value: 'Nov',
    label: 'November',
  },
  {
    value: 'Dec',
    label: 'December',
  },
]

const HolidaysFilter = ({
  onFilterHolidays,
  handleDateChange,
  selectedDate,
  onLoadHolidays,
  isclear,
}) => {
  const classes = useStyles()

  useEffect(() => {
    formik.resetForm({})
  }, [isclear])

  const onClearFilter = () => {
    formik.resetForm({})
    onLoadHolidays()
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      onFilterHolidays(values)
    },
  })

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={formik.handleSubmit}>
        {() => (
          <Form className={classes.filterForm}>
            {/* <Stack direction={{ xs: "column", md: "row" }} spacing={3}> */}
            <Grid item xs={3} className="mr-3">
              <Field
                className={classes.input}
                type="text"
                name="holiday_name"
                label="Holiday Name"
                id="holiday_name"
                variant="filled"
                component={CustomTextField}
                value={formik.values.holiday_name}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                className={classes.input}
                type="text"
                name="month"
                label="Select Month"
                id="month"
                variant="filled"
                component={CustomTextField}
                select
                options={monthsList}
                value={formik.values.month}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={3} className="pl-4  datpickerInput d-flex">
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="year"
                  value={selectedDate}
                  views={['year']}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={null}
                    />
                  )}
                />
              </LocalizationProvider>
              {/* </MuiPickersUtilsProvider> */}
            </Grid>
            <Grid md={2} className="text-right">
              <Stack
                style={{ marginLeft: 'auto', alignItems: 'center' }}
                direction="row"
                spacing={3}
              >
                <LoadingButton
                  type="submit"
                  variant="outlined"
                  startIcon={<Search sx={{ fontSize: 35 }} />}
                >
                  Search
                </LoadingButton>
                <Button
                  onClick={onClearFilter}
                  variant="outlined"
                  startIcon={<Close sx={{ fontSize: 35 }} />}
                >
                  Clear
                </Button>
              </Stack>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default HolidaysFilter
