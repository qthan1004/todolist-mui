import { Route, Redirect } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

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
