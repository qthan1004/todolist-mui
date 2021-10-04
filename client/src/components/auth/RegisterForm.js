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

function RegisterForm() {
  const { registerUser } = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(null);

  const theme = createTheme();

  const { username, password, confirmPassword } = registerForm;
  const onChangeRegister = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({
        type: "error",
        message: "Password does not match",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "error", message: registerData.message });
        //CLEAR WARNING
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
          <Box component="form" onSubmit={register} sx={{ mt: 1 }}>
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
              onChange={onChangeRegister}
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
              onChange={onChangeRegister}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={onChangeRegister}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
        <p className="mt-3">
          Do have an account?
          <Link to="/login">
            <Button variant="contained" sx={{ ml: "5px" }}>
              Log in
            </Button>
          </Link>
        </p>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterForm;
