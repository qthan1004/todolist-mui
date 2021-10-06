import { Route, Redirect } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../layout/Navbar";

const ProctectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <Navbar />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProctectedRoute;
