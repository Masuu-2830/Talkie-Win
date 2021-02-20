import React, { Component } from "react";
import logo from "../Images/logotalkie.png";
import FlashMessage from 'react-flash-message';
import or from "../Images/or.png";
import googlein from "../Images/googlein.png";
import { Button } from "reactstrap";
import "./SignUp.css";
import gimage from "../icons/download.png";
import Navbar from "../Components/Navbar/Navbar";
import fire from "../config/fire";
import { signInWithGoogle } from "../config/fire";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: "",
};

export default class SignIn extends Component {
  state = initialState;

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    if (!this.state.email.includes("@")) {
      emailError = "Invalid email";
    }

    if (!this.state.password) {
      passwordError = "Password cannot be blank";
    }

    if (emailError || nameError || passwordError) {
      this.setState({ emailError, nameError, passwordError });
      return false;
    }

    return true;
  };

  // login() {
  //   const email = this.state.email;
  //   const password = this.state.password;

  //   fire
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       console.log(JSON.stringify(user));
  //     })
  //     .catch((err) => {
  //       console.log("Error: " + err.toString());
  //     });
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log("Validated");
      const data = {
        username: this.state.email,
        password: this.state.password,
      };
      //
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
      };
      fetch("https://api.talkie.team/login", requestOptions)
        .then((response) => {
          debugger;
          console.log(response);
          // localStorage.setItem("token", res.idToken);
          localStorage.setItem("profileData", JSON.stringify(response));
        })
        .catch((err) => {
          console.log(err);
        });
        


      //   axios
      //     .post("login",
      // {data: data},
      // {headers: {"Access-Control-Allow-Origin": true}},
      // )
      //     .then((res) => {
      //       // console.log(res);
      //       localStorage.setItem("token", res.idToken);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      const email = this.state.email;
      const password = this.state.password;

      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          debugger;
          localStorage.setItem("profileData", JSON.stringify(user));
          console.log(user.user.email);
          const data = JSON.parse(localStorage.getItem("profileData"));
          console.log(data.user.email);
          // <Navbar />
          console.log(user);
        })
        .catch((err) => {
          console.log("Error: " + err.toString());
        });
      // clear form
      this.setState(initialState);
      
    } else {
      console.log("Not validated");
    }
    // <Redirect to ='/dashboard' />
  };
  render() {
    return (
      <div className="col-12">
        <div className="col-12 head">
          <img src={logo} alt="Talkie" className="logosu" />
          <div className="text-in">
            "If everyone is moving forward together, then success takes care of
            itself."
          </div>
        </div>
        <div className="form-container col-6 offset-3">
          <div className="col-12 offset-5 form-text">Sign In</div>
          <form onSubmit={this.handleSubmit} className="col-10 offset-1 form">
            <div>
              <input
                name="email"
                placeholder="Name/ Work-mail"
                className="inputsu col-12"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.emailError}
              </div>
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="inputsu col-12"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.passwordError}
              </div>
            </div>

            <button
              type="submit"
              value="submit"
              className="buttonsu col-12"
              style={{
                fontSize: "1.3em",
              }}
            >
              SIGN IN
            </button>
            <img src={or} alt="OR" className="col-12 or" />
            <div
              className="google col-12"
              onClick={() => {
                signInWithGoogle();
              }}
            >
              <img className="gimagesu" src={gimage} alt="" ></img>
              <span className="gtextsu">SIGN IN WITH GOOGLE</span>
            </div>
            {/* <img
              onClick={() => {
                signInWithGoogle();
              }}
              src={googlein}
              alt="Google SignIn"
              className="col-12 google"
            /> */}
            <div className="stay-password">
              <span className='checksi'>
              <input type="checkbox" id="check" className='checkboxsi' name="remember"></input>
              <label form="check" className="check"> Stay Signed in</label>
              </span>
              
              <div className="forgot">Forgot Password?</div>
            </div>
            <div className="col-12 offset-4 signup">
              Don't have an account?{" "}
              <Link to="/register">
                <span className='spansu'>Sign Up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
