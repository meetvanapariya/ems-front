import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
// Material
import { createTheme, ThemeProvider } from "@mui/material";

// Css
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./assets/style.css";
// Internal
import NotFound from "./shared/NotFound/NotFound";
import routes from "./routes/routes";
import { $error, $primary } from "./utils/colors";
import { CustomModal } from "./shared/Modal/CustomModal";

const App = () => {
  const is_darkmode = useSelector((state) => state.common.is_darkmode);
  const theme = createTheme({
    palette: {
      mode: is_darkmode ? "dark" : "light",
      primary: $primary,
      error: $error,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                exact
                path={route.path}
                component={route.hoc(route.component)}
              />
            );
          })}
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
      <CustomModal />
    </ThemeProvider>
  );
};

export default App;
