import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function LoginForm() {
  const { loginUser } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [alert, setAlert] = useState(null);

  const theme = createTheme();

  const { username, password } = loginForm;
  const onChangeLogin = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      console.log(loginData);
      if (!loginData.success) {
        setAlert({ type: "error", message: loginData.message });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={login} sx={{ mt: 1 }}>
            <AlertMessage info={alert} />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              placeholder="username"
              autoFocus
              value={username}
              onChange={onChangeLogin}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={onChangeLogin}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
          </Box>
        </Box>
        <p className="mt-3">
          Don't have an account?
          <Link to="/register">
            <Button variant="contained" sx={{ ml: "5px" }}>
              Register
            </Button>
          </Link>
        </p>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
