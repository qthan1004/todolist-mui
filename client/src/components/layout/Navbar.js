import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TodoLogo from "../../assets/todologo.png";
import LogoutIcon from "../../assets/logout.svg";

function Navbar() {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);
  const logout = () => logoutUser();

  return (
    <Box>
      <AppBar position="relative">
        <Toolbar variant="dense" position="relative">
          <Typography
            color="inherit"
            componant="div"
            sx={{ width: "10%", display: "flex" }}
          >
            <img src={TodoLogo} alt="todologo" width="32" height="32" />
            <Typography variant="h5" component="span" ml={1}>
              Todo
            </Typography>
          </Typography>
          <Typography
            color="inherit"
            component="div"
            sx={{
              display: "flex",
              width: "15%",
              justifyContent: "space-around",
            }}
          >
            <Link
              to="/dashboard"
              style={{ color: "white", fontWeight: "bolder" }}
            >
              Dashboard
            </Link>
            <Link
              to="/information"
              style={{ color: "white", fontWeight: "bolder" }}
            >
              Information
            </Link>
          </Typography>
          <Typography
            component="div"
            sx={{
              position: "absolute",
              right: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Welcome {username}</Typography>
            <Button onClick={logout}>
              <img src={LogoutIcon} alt="LogoutIcon" width="32" height="32" />
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
