import React, { useState } from 'react'
import { Field } from 'formik'
import FormData from 'form-data';
// api
import { useUploadProfilePicMutation } from "../../RTK-Query/appApi";

import { getUserInfo } from "../../utils";

const ProfileUpload = ({ setFieldValue, profileImage }) => {
  const [file, setFile] = useState('');
  const current_user = getUserInfo();
  const [updateProfilePic] = useUploadProfilePicMutation();

  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    profileImage || 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true'
  )
    
  const ImgUpload = ({ src }) => (
    <label htmlFor="profile_pic" className="custom-file-upload fas">
      <div className="img-wrap img-upload">
        <img for="profile_pic" src={src} alt="" />
      </div>
      <input
        name="profile_pic"
        label="profile pic"
        type="file"
        id="profile_pic"
        // onChange={onChange}
        onChange={(event) => {
          event.preventDefault()
          setFieldValue('profile_pic', event.currentTarget.files[0])
          const reader = new FileReader()
          const file = event.target.files[0]
          reader.onloadend = () => {
            setFile(file)
            setImagePreviewUrl(reader.result);
            let user_id = current_user?.user_id;
            let formData = new FormData();
            formData.append("profile_pic", file);
            formData.append("user_id", user_id);
            updateProfilePic({formData})
          }
          reader.readAsDataURL(file);
        }}
      />
    </label>
  )
  const Edit = ({ children }) => <div>{children}</div>
  return (
    <div>
      <Edit>
        <ImgUpload src={imagePreviewUrl} />
      </Edit>
    </div>
  )
}

export default ProfileUpload
