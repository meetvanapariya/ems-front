import React, { useEffect, useState } from "react";
import { Sort } from "@mui/icons-material";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import useData from "./useData";
import SkeletonLoader from "../../../shared/Loader/SkeletonLoader";
import { useSelector } from "react-redux";
import LeaveFilterComponent from "./LeaveFilterComponent";

const AdminLeaveTable = ({ history }) => {
  const { columns, isLeaveLoading, data } = useData();
  const [leaveArray, setLeaveArray] = useState();

  useEffect(() => {
    setLeaveArray(data);
  }, [data]);

  const darkMode = useSelector((state) => state.common.is_darkmode);

  return (
    <>
      {isLeaveLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <DataTable
            data={leaveArray}
            noDataComponent="no data"
            columns={columns}
            theme={darkMode ? "dark" : "light"}
            defaultSortField="id"
            sortIcon={<Sort />}
            defaultSortAsc={true}
            pagination
            highlightOnHover
            subHeader
            subHeaderComponent={
              <LeaveFilterComponent
                setLeaveArray={setLeaveArray}
                isAdmin
                data={data}
              />
            }
            persistTableHead
          />
        </>
      )}
    </>
  );
};

export default AdminLeaveTable;
