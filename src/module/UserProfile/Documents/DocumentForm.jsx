import React, { useState } from 'react'

import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
// import useStyles from './style'
import { Divider } from '@mui/material'
import { Formik, Form } from 'formik'
import { Field } from 'formik'
import useStyles from '../style'

import CustomTextField from '../../../shared/TextField/CustomTextField'
import FormData from 'form-data'

import { useUploadDocumentMutation } from '../../../RTK-Query/appApi'
// import { Field } from 'formik'
import { getUserInfo } from '../../../utils'

const DocumentForm = () => {
  const [previewImages, setPreviewImages] = useState([])
  const current_user = getUserInfo()
  const [uploadDocument] = useUploadDocumentMutation()
  const docData = {
    description: '',
    image: '',
  }
  const classes = useStyles()
  const validate = (values) => {
    const errors = {}
    return errors
  }
  // var ndata = new FormData();
  const onUpdate = async (values) => {
    let user_id = current_user?.user_id
    let formData = new FormData()
    formData.append('image', values.image)
    formData.append('description', values.document_description)
    formData.append('user_id', user_id)
    uploadDocument({ formData })
    console.log(values)
  }
  return (
    <Box>
      <Typography variant="h5">Upload Document</Typography>
      <Formik
        initialValues={docData}
        validate={validate}
        onSubmit={onUpdate}
        render={({ setFieldValue }) => (
          <Form encType="multipart/form-data">
            <Grid container>
              <Grid item sm={12}>
                <Box className={classes.docDesBox}>
                  <Field
                    name="document_description"
                    label="Document Name"
                    type="text"
                    id="document_description"
                    variant="standard"
                    fullWidth
                    required
                    component={CustomTextField}
                  />
                </Box>
              </Grid>
              <Grid item sm={12}>
                <Box className={classes.docDesBox}>
                  <input
                    name="image"
                    label="Documents"
                    type="file"
                    id="image"
                    variant="standard"
                    multiple
                    onChange={(event) => {
                      event.preventDefault()
                      setFieldValue('image', event.currentTarget.files[0])
                      const file = event.target.files[0]
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setPreviewImages(reader.result)
                      }
                      reader.readAsDataURL(file)
                    }}
                  />
                  {/* <img for="profile_pic" src={previewImages} alt="" width="100px"/> */}
                </Box>
              </Grid>
              <Grid item sm={12}>
                <Box className={classes.docSubmitBox}>
                  <Button variant="contained" type="submit" color="primary">
                    Upload
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      />
    </Box>
  )
}
export default DocumentForm
