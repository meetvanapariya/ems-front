import React from "react";
import { showNotification } from "../helper/Notifications";

import { getToken } from "../utils";

const Auth = (ComposedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
      };
    }
    componentDidMount() {
      const { history } = this.props;
      const token = getToken();
      if (token) {
        const pathname = history.location.pathname;
        this.setState({ isAuthenticated: true });
        if (pathname === "/" || pathname === "/login") {
          history.push("/dashboard");
        }
      } else {
        this.setState({ isAuthenticated: false });
        history.push("/login");
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
};
export default Auth;
