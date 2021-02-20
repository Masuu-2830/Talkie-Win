import React, { Component } from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Navbar from "./Components/Navbar/Navbar";
// import Home from "./Home";
import fire from "./config/fire";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        // console.log(this.user);
        //
        // const data = user.refreshToken;
        // axios.post('login/google', data).then(res => {
        //     if(data===res.refreshToken){
        //     localStorage.setItem('token', res.refreshToken);
        // }
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
        //
      } else {
        this.setState({ user: null });

        // const data= user.idToken;
        // axios.post('register/google', data).then(
        //     res=>{
        //         // console.log(res);
        //         localStorage.setItem('token', res.idToken);
        //     }).catch(
        //         err=>{
        //             console.log(err);
        //         }
        // );
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.user ? (
          <Navbar />
        ) : (
          <Switch>
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={SignIn} />
            <Route path="/dashboard" component={Navbar} />
            <Redirect to="/register" />
          </Switch>
        )}
        {/* <Switch>
          {this.state.user ? (
            <Route path="/dashboard" component={Navbar} />
          ) : (
            <Redirect to="/register" />
          )}
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={SignIn} />
        </Switch> */}
      </div>
    );
  }
}

export default withRouter(Main);
