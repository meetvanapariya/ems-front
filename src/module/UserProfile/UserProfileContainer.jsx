import React from "react";
import { useParams } from "react-router";
import UserProfile from "./UserProfile";
// import FormData from "form-data";
import { showNotification } from '../../helper/Notifications';
// api
import { useGetSingleUserQuery, useUpdateSingleUserMutation } from "../../RTK-Query/appApi";
//Custom component
import { TableDataSkeleton } from "../../shared/Loader/SkeletonLoader";
const UserProfileContainer = () => {
  let { id } = useParams();

  const { isError, isFetching, isSuccess, isLoading, error, data } = useGetSingleUserQuery(id);
  const [updateUser] = useUpdateSingleUserMutation();
  if (isFetching === true) {
    if (isSuccess === true) {
      // console.log(data);
      showNotification("Successfully Updated!!", "success");
    }
  }
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    return errors;
  };
  // var ndata = new FormData();
  const onUpdate = async (values) => {
    if (values._id) {
      let id = values._id
      updateUser({ id, values });
    }
  }
  const componentToBeRender = isLoading ? (
    <TableDataSkeleton
      animation="wave"
      skeletonType="profileView"
      height={50}
      isHeader={true}
    />
  ) : (isError === false) ? (
    <UserProfile
      getUsetData={data.payload}
      validate={validate}
      onUpdate={onUpdate}
    />
  ) : showNotification("Something went wrong!!", "error")

  return (<>
    {componentToBeRender}
  </>
  )
}
export default UserProfileContainer
