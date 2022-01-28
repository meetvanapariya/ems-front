import { Sort } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import useData from "./useData";
import SkeletonLoader from "../../../shared/Loader/SkeletonLoader";
import { useSelector } from "react-redux";
import LeaveFilterComponent from "../AdminLeave/LeaveFilterComponent";

const ReactDataGrid = () => {
  const { columns, data, isLeaveLoading } = useData();
  const darkMode = useSelector((state) => state.common.is_darkmode);
  const [leaveArray, setLeaveArray] = useState();
  useEffect(() => {
    setLeaveArray(data);
  }, [data]);
  return (
    <>
      {isLeaveLoading ? (
        <SkeletonLoader />
      ) : (
        <DataTable
          data={leaveArray}
          columns={columns}
          theme={darkMode ? "dark" : "light"}
          defaultSortField="id"
          sortIcon={<Sort />}
          defaultSortAsc={true}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <LeaveFilterComponent setLeaveArray={setLeaveArray} data={data} />
          }
          persistTableHead
        />
      )}
    </>
  );
};

export default ReactDataGrid;
