import React, { useState } from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import { Link as RouterLink } from "react-router-dom";
import auth from "../services/authService";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  makeStyles,
  createTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().required(),
  };
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const result = Joi.validate({ name, email, password }, schema);
      if (result.error) throw result.error.details[0].message;

      const response = await userService.register({ name, email, password });
      auth.loginWithJWT(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error);
      }
    }
    setLoading(false);
  };
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: blue[200],
        },
        type: "dark",
      },
    })
  );
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      position: "relative",
    },
    submitSpinner: {
      position: "absolute",
      display: "flex",
      justifySelf: "center",
      alignSelf: "center",
    },
  }));

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="fName"
                  label="User Name"
                  autoFocus
                  inputProps={{
                    autocomplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  inputProps={{
                    autocomplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="new-email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputProps={{
                    autocomplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
              disabled={loading}
            >
              Register
              {loading && (
                <CircularProgress
                  className={classes.submitSpinner}
                  size={30}
                  color="black"
                />
              )}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2" component={RouterLink}>
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};
export default RegisterForm;
