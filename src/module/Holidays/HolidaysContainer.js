import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import moment from 'moment'
import filter from 'lodash/filter'

//api service
import {
  useDeleteHolidayMutation,
  useUpdateHolidayMutation,
  useAddHolidayMutation,
  useGetHolidaysQuery,
} from '../../RTK-Query/appApi'

// Material
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HoliDayModal from './HolidayModal'
import Event from '@mui/icons-material/Event'

import Holidays from './Holidays'
import { getUserInfo } from '../../utils'
import HolidaysFilter from './HolidaysFilter'
import { showNotification } from '../../helper/Notifications'
import { AlertDialog } from '../../shared/AlertDialog/AlertDialog'

const HolidaysContainer = () => {
  const { user_role } = getUserInfo() || ''
  const { data, isLoading: isHolidayLoading } = useGetHolidaysQuery()
  const [addHolidays] = useAddHolidayMutation()
  const [deleteHoliday] = useDeleteHolidayMutation()
  const [updateHoliday, { isLoading }] = useUpdateHolidayMutation()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isclear, setIsClear] = useState(false)
  const [holiday, setHoliday] = useState({})
  const [holidays, setHolidays] = useState([])
  const isDarkMode = useSelector((state) => state.common.is_darkmode)
  const resHolidays = data?.payload?.holidays || []

  useEffect(() => {
    onLoadHolidays()
  }, [resHolidays])

  const onLoadHolidays = () => {
    const filterHoliday = filter(
      resHolidays,
      (h) => moment(h.holiday_date).format('YYYY') === moment().format('YYYY')
    )
    setSelectedDate(new Date())
    setHolidays(filterHoliday)
  }

  const handleDateChange = (value) => {
    const filterHoliday =
      filter(
        resHolidays,
        (h) =>
          moment(h.holiday_date).format('YYYY') === moment(value).format('YYYY')
      ) || []
    setSelectedDate(value)
    setIsClear(true)
    setHolidays(filterHoliday)
  }

  const columns = [
    {
      name: '#',
      selector: (row, index) => {
        return index + 1
      },
      grow: 0.4,
    },
    {
      name: 'Title',
      selector: (row) => row['holiday_name'],
      sortable: true,
    },
    {
      name: 'Holiday Date',
      selector: (row) => {
        const holiday_date = moment(row['holiday_date']).format('Do MMM YYYY')
        return holiday_date
      },
      sortable: true,
    },
    {
      name: 'Days',
      selector: (row) => {
        const days = moment(row['holiday_date']).format('dddd')
        return days
      },
      sortable: true,
    },

    {
      name: 'Action',
      sortable: false,
      selector: (row) => row['null'],
      center: true,

      cell: (userData) => {
        return (
          <div key={userData._id}>
            <IconButton onClick={() => onEditHoliday(userData)} size="large">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => onDeleteHoliday(userData._id)}
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const onEditHoliday = (data) => {
    onOpenModal(true)
    setHoliday(data)
  }

  const onDeleteHoliday = (id) => {
    const alertMsg = {
      title: 'Are you sure you want to delete user?',
      message: '',
      button1: 'Confirm',
      button2: 'Cancel',
      id: id,
      method: deleteHoliday,
    }
    AlertDialog(alertMsg)
  }

  const onOpenModal = (isEdit) => {
    setIsOpen(true)
    setIsEdit(isEdit)
  }

  const onCloseHandle = () => {
    setIsOpen(false)
    setHoliday({})
  }

  const onSaveHoliday = async (holidayDetail) => {
    if (holidayDetail.holidayDate && holidayDetail.holidayName) {
      const values = {
        holiday_name: holidayDetail?.holidayName,
        holiday_date: holidayDetail?.holidayDate,
      }
      if (isEdit) {
        const holiday_id = holiday._id
        try {
          const res = await updateHoliday({ holiday_id, ...values }).unwrap()
          if (res.status === '200') {
            showNotification(res.message, 'success')
            onCloseHandle()
          }
        } catch (err) {
          alert(JSON.stringify(err, null, 2))
        }
      } else {
        try {
          const res = await addHolidays(values).unwrap()
          if (res.status === '200') {
            setIsEdit(false)
            onCloseHandle()
          }
        } catch (err) {
          alert(JSON.stringify(err, null, 2))
        }
      }
    }
  }

  const onFilterHolidays = (holiday) => {
    const { month, holiday_name } = holiday
    let patients = holidays
    if (holiday_name) {
      const re = new RegExp(holiday_name + '.+$', 'i')
      patients = holidays.filter(function (e, i, a) {
        return e.holiday_name.search(re) != -1
      })
    }
    if (month) {
      patients =
        filter(patients, (h) => {
          return moment(h.holiday_date).format('MMM') === month
        }) || []
    }
    setHolidays(patients)
  }

  return (
    <Box p={2} sx={{ flexGrow: '1' }}>
      <Grid container xs={12}>
        <Grid item xs={8} className="pl-4 mb-3">
          <Typography variant="h6" fontWeight="medium" color="primary">
            <Event fontSize="large" /> HoliDays
          </Typography>
        </Grid>
        <Grid item xs={4} className="text-right pr-4 mb-3">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onOpenModal(false)}
          >
            + Add Holidays
          </Button>
        </Grid>
        {/* {user_role === 'Admin' ? (
          <Grid container xs={12} className="pl-4 pr-4 mb-3t">
            <HolidaysFilter
              ohandleDateChangenFilterHolidays={onFilterHolidays}
              handleDateChange={handleDateChange}
              selectedDate={selectedDate}
              onLoadHolidays={onLoadHolidays}
              isclear={isclear}
            />
          </Grid>
        ) : (
          ''
        )} */}

        <Holidays
          holidays={holidays}
          columns={columns}
          isDarkMode={isDarkMode}
          isHolidayLoading={isHolidayLoading}
          onFilterHolidays ={onFilterHolidays}
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          onLoadHolidays={onLoadHolidays}
          isclear={isclear}
        />
      </Grid>
      <HoliDayModal
        isEdit={isEdit}
        open={isOpen}
        handleClose={() => onCloseHandle()}
        onSaveHoliday={onSaveHoliday}
        holiday={holiday}
        isLoading={isLoading}
      />
    </Box>
  )
}

export default HolidaysContainer
