import React, { Component } from "react";
import logo from "../Images/logotalkie.png";
import or from "../Images/or.png";
import google from "../Images/google.png";
import { Button } from "reactstrap";
// import { Control, Errors } from "react-redux-form";
// import { reduxForm } from "redux-form";
import fire from "../config/fire";
import gimage from "../icons/download.png";
import { signUpWithGoogle } from "../config/fire";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: "",
};

class SignUp extends Component {
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

    if (!this.state.name) {
      nameError = "Name cannot be blank";
    }

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

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log("Validated");
      const data = {
        Name: this.name,
        Email: this.email,
        Password: this.password,
      };

      //     const data={
      //     "username": "varunaditya904@gmail.com",
      //     "password":"Varun@12"
      // }

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
      };
      fetch("https://api.talkie.team/register", requestOptions)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      //   axios
      //     .post("register",
      // {data: data},
      // {headers: {"Access-Control-Allow-Origin": true}}
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
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          localStorage.setItem("profileData", JSON.stringify(user));
          console.log(user.user.email);
          console.log(user.user);
          const data = JSON.parse(localStorage.getItem("profileData"));
          console.log(data.user.email);
          console.log(data.user);
          console.log(JSON.stringify(user));
          // this.props.history.replace('/dashboard');
        })
        .catch((err) => {
          console.log("Error: " + err.toString());
        });
      // clear form
      this.setState(initialState);
    }
    // <Redirect to = '/dashboard' />
  };

  // signUp() {
  // const name = this.state.name;
  //   const email = this.state.email;
  //   const password = this.state.password;

  //   fire
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       console.log(JSON.stringify(user));
  //     })
  //     .catch((err) => {
  //       console.log("Error: " + err.toString());
  //     });
  // }
  render() {
    return (
      <div className="col-12">
        <div className="col-12 head">
          <img src={logo} alt="Talkie" className="logosu" />
          <div className="text">
            "Alone,we can do so little; Together we can do so much."
          </div>
        </div>
        <div className="form-container col-6 offset-3">
          <div className="col-12 offset-4 form-text">Sign Up For Free</div>
          <form onSubmit={this.handleSubmit} className="col-10 offset-1 form">
            <div>
              <input
                name="name"
                placeholder="Name"
                className="inputsu col-12"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.nameError}
              </div>
            </div>

            <div>
              <input
                name="email"
                placeholder="Enter Your Work-mail"
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
              SIGN UP
            </button>
            <img src={or} alt="OR" className="col-12 or" />
            <div
              
              className="google col-12"
              onClick={() => {
                signUpWithGoogle();
              }}
              
            >
              <img className="gimagesu" src={gimage} alt="" ></img>
              <span className="gtextsu">SIGN UP WITH GOOGLE</span>
            </div>
            {/* <img
              onClick={() => {
                signInWithGoogle();
              }}
              src={google}
              alt="Google SignIn"
              className="col-12 google"
            /> */}
            <div className="col-12 offset-4 terms">
              By Signing Up, you agree to Talkie's <span className='spansu'>Terms of Use </span>&{" "}
              <span className='spansu'>Privacy</span>
            </div>
            <div className="col-12 offset-4 signin">
              Already have an account?{" "}
              <Link to="/login">
                <span className='spansu'>Sign in now</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
