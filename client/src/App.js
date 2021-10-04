import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./components/view/Auth";
import AuthContextProvider from "./components/contexts/AuthContext";
import ProctectedRoute from "./components/routing/ProtectedRoute";
import Dashboard from "./components/view/Dashboard";
import Information from "./components/view/Information";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} authRoute="register" />}
          />
          <ProctectedRoute exact path="/dashboard" component={Dashboard} />
          <ProctectedRoute exact path="/information" component={Information} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
