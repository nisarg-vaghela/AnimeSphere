import React, { useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = Joi.validate({ email, password }, schema);
      if (result.error) throw result.error.details[0].message;
      await auth.login(email, password);
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
      marginTop: theme.spacing(1),
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate autocomplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoFocus
              spellCheck="false"
              inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
              // autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
              disabled={loading}
            >
              Sign In
              {loading && (
                <CircularProgress
                  className={classes.submitSpinner}
                  size={30}
                  color="black"
                />
              )}
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link to="/reset-password" variant="body2" component={RouterLink}>
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/register" variant="body2" component={RouterLink}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};
export default LoginForm;
