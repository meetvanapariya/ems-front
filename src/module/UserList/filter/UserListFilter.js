import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

// Material
import { Button, Stack } from "@mui/material";
import { Close, Search } from "@mui/icons-material";

// Internal
import CustomTextField from "../../../shared/TextField/CustomTextField";
import { EMS_ROLE } from "../../../utils/role";
import { camelCaseConvertor } from "../../../utils";

const userRole = [{ label: "All", value: "All" }];
for (const role in EMS_ROLE) {
  userRole.push({
    label: camelCaseConvertor(role),
    value: camelCaseConvertor(role),
  });
}
const initialValues = {
  search_by_name: "",
  search_by_role: "All",
};

const UserListFilter = ({ searchHandler, searchClearHandler }) => {
  const [clearSearch, setClearSearch] = useState(true);

  return (
    <Stack direction="row" my={3} sx={{ width: "100%" }}>
        <Formik initialValues={initialValues} onSubmit={searchHandler}>
          {({ values, resetForm }) => {
            if (values.search_by_role !== "All" || values.search_by_name !== "") {
              setClearSearch(false);
            } else {
              setClearSearch(true);
            }
            return (
              <Form>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  <Field
                    type="text"
                    name="search_by_name"
                    label="Search By Name"
                    id="search_by_name"
                    variant="filled"
                    component={CustomTextField}
                  />
                  <Field
                    type="text"
                    name="search_by_role"
                    label="Search By Role"
                    id="search_by_role"
                    variant="filled"
                    component={CustomTextField}
                    select
                    options={userRole}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    position="absolute"
                    right="25px"
                  >
                    <Button
                      variant="outlined"
                      type="submit"
                      startIcon={<Search />}
                    >
                      Search
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={clearSearch}
                      startIcon={<Close />}
                      onClick={() => {
                        resetForm({ values: "" });
                        searchClearHandler();
                      }}
                    >
                      Clear
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            );
          }}
        </Formik>
    </Stack>
  );
};
export default UserListFilter;
