import { Box } from "@mui/material";
import React from "react";
import { Skeleton } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <Box style={{ height: "650px" }}>
      <Skeleton style={{ height: "100px" }} animation="wave" />
      <br />
      <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Skeleton
          style={{ flexGrow: 1, marginRight: "20px", height: "70px" }}
          animation="wave"
        />
        <Skeleton
          style={{ flexGrow: 1, marginRight: "20px", height: "70px" }}
          animation="wave"
        />
        <Skeleton
          style={{ flexGrow: 1, marginRight: "20px", height: "70px" }}
          animation="wave"
        />
        <Skeleton
          style={{ flexGrow: 1, marginRight: "20px", height: "70px" }}
          animation="wave"
        />
        <Skeleton style={{ flexGrow: 1, height: "70px" }} animation="wave" />
      </Box>
      <br />

      <Skeleton style={{ height: "70px" }} animation="wave" />
      <br />
      <Skeleton style={{ height: "70px" }} animation="wave" />
      <br />
      <Skeleton style={{ height: "70px" }} animation="wave" />
      <br />
      <Skeleton style={{ height: "70px" }} animation="wave" />
      <br />
      <Skeleton style={{ height: "100px" }} animation="wave" />
    </Box>
  );
};

// Custom Loader
const selectedSkeleton = (
  height,
  variant,
  animation,
  skeletonType,
  ...rest
) => {
  let skeletonToBeSelected;
  switch (skeletonType) {
    case "tableView":
      skeletonToBeSelected = (
        <>
          {[...Array(rest[0].numberOfRow)].map(() => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                }}
              >
                {[...Array(rest[0].numberOfColumn)].map(() => {
                  return (
                    <Skeleton
                      variant={variant}
                      height={height}
                      animation={animation}
                      style={{
                        marginRight: rest[0].columnGap,
                        borderRadius: "2px",
                        flexGrow: 1,
                        minWidth: `${
                          window.innerWidth / 2 / rest[0].numberOfColumn +
                          4 * rest[0].columnGap
                        }px`,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </>
      );
      break;
    case "profileView":
      skeletonToBeSelected = (
        <div
          className="profile-container"
          style={{
            height: "100vh",
            padding: "30px",
            marginTop: "40px",
          }}
        >
          <div
            className="profile-container-top"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="left-image">
              <Skeleton
                variant="circular"
                height={200}
                width={200}
                animation={animation}
              />
            </div>
            <div
              className="right-content"
              style={{ width: "100%", marginLeft: "7rem" }}
            >
              {[...Array(4)].map(() => {
                return (
                  <Skeleton
                    variant={variant}
                    height={height}
                    animation={animation}
                    style={{
                      borderRadius: "2px",
                      flexGrow: 1,
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div
            className="profile-container-bottom"
            style={{ marginTop: "4rem" }}
          >
            {[...Array(7)].map(() => {
              return (
                <Skeleton
                  variant={variant}
                  height={height}
                  animation={animation}
                  style={{
                    borderRadius: "2px",
                    flexGrow: 1,
                  }}
                />
              );
            })}
          </div>
        </div>
      );
      break;
    default:
      break;
  }
  return skeletonToBeSelected;
};

export const TableDataSkeleton = ({
  height,
  variant,
  animation,
  skeletonType,
  isHeader,
  ...rest
}) => {
  return (
    <>
      {isHeader && (
        <Skeleton
          variant="text"
          height={30}
          width={30}
          style={{ width: "calc(100% - 240px)", marginTop: "40px" }}
        />
      )}
      <Box>
        {selectedSkeleton(height, variant, animation, skeletonType, rest)}
      </Box>
    </>
  );
};
export default SkeletonLoader;
