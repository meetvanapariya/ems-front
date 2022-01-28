import React, { useState } from "react";
import FormData from "form-data";
import { useParams } from "react-router";

// Mui
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import useStyles from "../style";
import { Divider } from "@mui/material";
import { Formik, Form } from "formik";
import { Field } from "formik";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { IconButton } from "@mui/material";
import { Container } from "@mui/material";
import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { IMG_BASE_URL } from "../../../config";

//Custom component
import CustomTextField from "../../../shared/TextField/CustomTextField";
import { TableDataSkeleton } from "../../../shared/Loader/SkeletonLoader";
import DocumentContainer from "./DocumentContainer";
// Rtk
import {
  useGetDocumentQuery,
  useDeleteDocumentMutation,
} from "../../../RTK-Query/appApi";

import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import { confirmAlert } from "react-confirm-alert";

import { showNotification } from "../../../helper/Notifications";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#424242",
    height: "400px",
  },
};

Modal.setAppElement("#root");

const Document = () => {
  let { id } = useParams();
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = useState(false);

  const { isError, isFetching, isSuccess, isLoading, error, data } =
    useGetDocumentQuery(id);
  const [deleteDocument] = useDeleteDocumentMutation();
  let subtitle;
  const handelDeleteDocument = async (id) => {
    return confirmAlert({
      title: "Are you sure you want to delete?",
      message: "",
      buttons: [
        {
          label: "Confirm",
          onClick: async () => {
            try {
              deleteDocument({ document_id: id });
            } catch (err) {
              showNotification(err.error, "error");
            }
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const componentToBeRender = isLoading ? (
    <TableDataSkeleton
      animation="wave"
      skeletonType="profileView"
      height={50}
      isHeader={true}
    />
  ) : isError === false ? (
    <Box>
      <Box className={classes.profileDiv}>
        <AttachmentIcon className={classes.icons} color="Primary" />
        <Typography variant="h6" color="Primary">
          Documents Details
        </Typography>
      </Box>
      <Divider variant="inset" className={classes.divder} />
      <Box sx={{ margin: "50px", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={openModal} color="primary">
          Add Documents +
        </Button>
      </Box>
      <SimpleReactLightbox>
        <SRLWrapper>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table
              className={classes.docInnerBox}
              sx={{ minWidth: 650 }}
              style={{ tableLayout: "fixed" }}
              aria-label="simple table"
            >
              <TableHead sx={{ backgroundColor: "darkgrey" }}>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Document Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              {data.payload.map((item) => {
                return (
                  <>
                    <TableRow
                      key={item._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        {" "}
                        <img
                          src={`${IMG_BASE_URL}${item.document_img}`}
                          alt=""
                          className={classes.docImg}
                        />
                      </TableCell>
                      <TableCell component="th">
                        <Typography variant="h6">
                          {item.document_description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          className={classes.ImgBoxButton}
                          onClick={() => handelDeleteDocument(item._id)}
                          size="large"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </Table>
          </TableContainer>
        </SRLWrapper>
      </SimpleReactLightbox>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <DocumentContainer />
      </Modal>
    </Box>
  ) : (
    ""
  );

  return <>{componentToBeRender} </>;
};
export default Document;
