import React, { useState, useEffect } from 'react'

// style components
import Profile from './Profile'
import JoiningDetails from './JoiningDetails'
import ContactDetails from './ContactDetails'
import PersonalBasicDetails from './PersonalBasicDetails'

//MUI
import { Grid } from '@mui/material'
import { Box } from '@mui/material'
import { Container } from '@mui/material'
import useStyles from './style'
import { Formik, Form } from 'formik'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'

// helper functions
import { converDateUserProfile } from '../../helper/ConvertDate'
import Skills from './Skills'
import Document from './Documents/Document'
const UserProfile = ({ getUsetData, validate, onUpdate }) => {
  const [userData, setUserData] = useState({ ...getUsetData })
  const [form, setForm] = useState([''])
  const handleAddSkill = (e) => {
    e.preventDefault()
    const inputState = {
      name: '',
      value: '',
      is_admin: '',
    }
    setForm((prev) => [...prev, inputState])
  }
  const changeValue = (index, event) => {
    event.preventDefault()
    event.persist()
    setForm((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item
        }
        if (event.target.name === 'is_admin') {
          return {
            ...item,
            [event.target.name]: event.target.checked,
          }
        } else {
          return {
            ...item,
            [event.target.name]: event.target.value,
          }
        }
      })
    })
  }
  const handleRemoveField = (e, index) => {
    e.preventDefault()
    setForm((prev) => prev.filter((item) => item !== prev[index]))
  }
  userData.user_birth_date = converDateUserProfile(userData.user_birth_date)
  userData.employment_start_date = converDateUserProfile(
    userData.employment_start_date
  )
  if (form.length > 1) {
    // console.log(form.length);
    userData.meta = form
  }

  useEffect(() => {
    if (userData.meta !== undefined) {
      setForm(userData.meta)
    }
  }, [])
  const classes = useStyles()
  return (
    <>
      <Formik
        initialValues={userData}
        validate={validate}
        onSubmit={onUpdate}
        render={({ setFieldValue }) => (
          <Form encType="multipart/form-data">
            <Box mt="18px">
              <Container maxWidth="lg">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Profile
                      getUsetData={userData}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <JoiningDetails getUsetData={userData} setFieldValue={setFieldValue} />
                  </Grid>
                  <Grid item xs={12}>
                    <ContactDetails getUsetData={userData} />
                  </Grid>
                  <Grid item xs={12}>
                    <PersonalBasicDetails getUsetData={userData} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skills
                      form={form}
                      handleAddSkill={handleAddSkill}
                      changeValue={changeValue}
                      handleRemoveField={handleRemoveField}
                    />
                  </Grid>
                </Grid>
                <Document />
                <Divider variant="inset" className={classes.divder} />
                <Box
                  sx={{
                    margin: '50px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button variant="contained" type="submit" color="primary">
                    Update Profile
                  </Button>
                </Box>
              </Container>
            </Box>
          </Form>
        )}
      />
    </>
  )
}
export default UserProfile
