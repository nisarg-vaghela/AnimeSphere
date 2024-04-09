import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import auth from "./services/authService";

import AppNavbar from "./components/navbar";
import Anime from "./components/anime";
import CardContainer from "./components/cardContainer";
import Footer from "./components/footer";
import RegisterForm from "./components/register";
import LoginForm from "./components/login";
import Logout from "./components/logout";
import User from "./components/user";
import Users from "./components/users";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/notFound";

class App extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const { data: user } = await auth.getCurrentUser();
    this.setState({ user });
  }

  handleChangeUser = (newUser) => {
    this.setState({ user:newUser });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar user={this.state.user} {...this.props} />
          <ToastContainer />
          <main className="container h-100">
            <Switch>
              <Route
                path="/anime/:id"
                render={(props) => (
                  <Anime
                    key={props.match.params.id}
                    user={this.state.user}
                    {...props}
                  />
                )}
              />
              <Route path="/register" component={RegisterForm} s />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route
                path="/users/:id"
                render={(props) => (
                  <User
                    key={props.match.params.id}
                    user={this.state.user}
                    {...props}
                    changeUser={ this.handleChangeUser }
                  />
                )}
              />
              <Route path="/users" component={Users}/>
              <Route exact path="/" component={CardContainer} />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
