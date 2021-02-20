import React, { Component } from "react";
import Team from "../team/team";
import "./Navbar.css";
import teamimg from "../../icons/iconfinder_simpline_13_2305639.jpg";
import settingimg from "../../icons/iconfinder_-_Gear-Settings-Setting-Wheel-_3844474.png";
import logimg from "../../icons/iconfinder_logout_close_sign_out_exit_access_3994382.png";
import userimg from "../../icons/iconfinder_simpline_13_2305639.png";
import feedbackimg from "../../icons/iconfinder_ic_feedback_48px_3669434.png";
import dashboardimg from "../../icons/Group 461.png";
import logo from "../../icons/talkie logo.jpg";
import helpimg from "../../icons/iconfinder_help_info_question_faq_5402385.png";
import ellipse from "../../icons/Ellipse 21.png";
import Feedback from "../Feedback/feedback";
import Profile from "../Profile/profile";
import CreateTeam from "../CreateTeam/createTeam";
import Settings from "../Settings/settings";
import { color } from "../Profile/profile";
import img1 from "../../icons/—Pngtree—avatar icon profile icon member_5247852.png";
import "./Navbar.css";
import { Alert } from "reactstrap";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
//
import fire from "../../config/fire";
import axios from "axios";

class Navbar extends Component {
  state = {
    mailid: null,
    showteam: false,
    showfeedback: false,
    showprofile: false,
    showcards: false,
    showsettings: false,
    showbutton: false,
    bgcolor1: "white",
    bgcolor2: "white",
    bgcolor3: "white",
    bgcolor4: "white",
    bgcolor5: "white",
    bgcolor6: "white",
    color1: "#3D3B66",
    color2: "#3D3B66",
    bgcolor: color,
    image: img1,
    valueimg: false,
    valueimg1: false,
    user: "",
    accessToken: "",
    alertdash: false,
  };

  constructor() {
    super();
    if (localStorage.getItem("profileData")) {
      const data = JSON.parse(localStorage.getItem("profileData"));
      console.log(data);
      this.setState({
        ...this.state,
        mailid: data.user.email,
      });
    }
  }

  logout() {
    fire.auth().signOut();

    // History.push("/register");
  }

  teamHandler = () => {
    this.setState({
      showteam: true,
      showfeedback: false,
      showprofile: false,
      showcards: false,
      showsettings: false,
      bgcolor1: "#F5F5F6",
      bgcolor2: "white",
      bgcolor3: "white",
      bgcolor4: "white",
      bgcolor5: "white",
      bgcolor6: "white",
      color2: "#3D3B66",
      color: "#3D3B66",
    });
  };
  feedbackHandler = () => {
    this.setState({
      showteam: false,
      showfeedback: true,
      showprofile: false,
      showcards: false,
      showsettings: false,
      bgcolor2: "#F5F5F6",
      bgcolor1: "white",
      bgcolor3: "white",
      bgcolor4: "white",
      bgcolor5: "white",
      bgcolor6: "white",
      color2: "#3D3B66",
      color: "#3D3B66",
    });
  };
  profileHandler = () => {
    this.setState({
      showteam: false,
      showfeedback: false,
      showprofile: true,
      showcards: false,
      showsettings: false,
      bgcolor1: "white",
      bgcolor2: "white",
      bgcolor3: "#F5F5F6",
      bgcolor4: "white",
      bgcolor5: "white",
      bgcolor6: "white",
      color2: "#3D3B66",
      color: "#3D3B66",
    });
  };
  createTeamHandler = () => {
    this.setState({
      showteam: false,
      showfeedback: false,
      showprofile: false,
      showsettings: false,
      showcards: !this.state.showcards,
      bgcolor1: "rgba(0, 0, 0, 0)",
      bgcolor2: "rgba(0, 0, 0, 0)",
      bgcolor3: "rgba(0, 0, 0, 0)",
      bgcolor4: "white",
      bgcolor6: "#3D3B66",
      bgcolor5: "white",
      color1: "#3D3B66",
      color2: "white",
    });
  };
  joinTeamHandler = () => {
    this.setState({
      showteam: false,
      showfeedback: false,
      showprofile: false,
      showsettings: false,
      showcards: false,
      bgcolor1: "rgba(0, 0, 0, 0)",
      bgcolor2: "rgba(0, 0, 0, 0)",
      bgcolor3: "rgba(0, 0, 0, 0)",
      bgcolor4: "#3D3B66",
      bgcolor5: "white",
      bgcolor6: "white",
      color1: "white",
      color2: "#3D3B66",
    });

    // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRlYW1zIjpbXSwic3RhdHVzIjpmYWxzZSwiX2lkIjoiNjAwMDIxN2RkMTI1NzYyMGU4N2FkMDU4IiwiTmFtZSI6IlZhcnVuIiwidXNlcm5hbWUiOiJiaGF0aXZhcnVuMTIzQGdtbWFpbC5jb20iLCJwaWMiOiJodHRwczovL3RhbGtpZS1pbWFnZXMuczMuYW1hem9uYXdzLmNvbS9pbWFnZXMlMjAlMjgxJTI5LmpwZWciLCJzYWx0IjoiZWM1OGMxMDA4N2U0MGM2N2FkODU5NTM3YTAwOTM3MzAyNTRjYmE3YWRlNDBjZmU1MTJiNjE4MTcwZmRiN2MwNyIsImhhc2giOiIwMTlkZGJjMGNmZjMzNjFjMWJkMmJmYTkzNTA2M2Y4M2JkYjk0NTg0NmY5YjMwODRmZWIzYTBmMGIyZjg3M2JkMmQ4OWEwMWQ0YWNhNTEzOGJkZTMyMmZhNzYwYzVhNGU4ZTYyOWQyMWFlZWY4YmY0OWEzMTE4ODhjYmQzNDYwZTUxMzQ5NjA5ZDkyYjg3MzJhNTJhMzc0MzQ2YWI4NTZmMjZkN2RmZDQ5NmE4NDQzMzU1NjQ1ZjRiZWQ4Yjk1MWI4M2Q3Y2YyODFkNjg1ZTgwYjg0NjBlYzc4YTczMmY0ZTJhMDJlMjk3NTZlNDVmZTI4Yjc4ZGY4ZTUxN2RjMzg2NWFlZmRlMzA1YTE0MTgwNDFlMGNiMGU5YTBjZTc2YzgwZjJjNWQzNjg5MjU5NWM4ZTdjOTE1OTQ4N2JiNTM3YTljMmM3NGVkYTBkZGYyM2FlYzMzOTA0OTMwMDZmZjAwOTkxZDI1ODNiMjE1YTE3NDhiMjFmYzJlZmUxYzJkMDBjMDJhNzI0ZDY4MzE0ZDRjMjZjMmY0OWU5ODVlMDU0MzY3YjZhYmM4YmJhYTU4M2YyM2RmNzhhYTRlMjk1YTRjNmRhZjE3MzVkMWM0YzQxYjhiMjFlNjkzZGFiNjczOGY3MWEzODdlM2JkODVjODRhNjY0MmM2YzI4YzJmYzNkZmJjMDE4N2ExNjcxZmQ4ZjMyMGI1N2Q4MGM1YjY3ZWEzZTY0NjE2ODMxNzA2ZTdlZDM1NmNmMDYwMzM0YTgyNGMxNzA4YTFkOTBmZDhiZWI4NTA3ODAzNTAzMjg0MmE2ZGFkMzdlYmZjMTBiOTUwMThmZWVkZDlkMzZlYTc2YjZhNTJhZjgwYmQzMWVkMjJhNDBkZjAyMWE3NjUzODBjMGIxN2I5MTczYzYyOWVhMmY0NDk2Zjc2OTkxNGIzMmI0NzQ1ZmRjZjY0YjFjMzY4MzI0NTE3NTlmOWI1NDAwYzUwMDNjOWE2ZWU4Y2YwOGQwNjAwOGIyMjgyMDgzMTRkYjBhMmQwY2NjMThkODIwZjE0MzVlZWFhMTQ0Zjc2YjBiNzNlMjc4ZTc1MTc4ZDZiNDQ3NDIyNjBjODg5ZWI0ZTY2MWQ1NmUyMDNiZTliYzM0N2FkNDljMjQwNzc0Yjk1ZTE1NmJiZjkwZDU3YjU3NTQxNjc0ZDQ5MDAyMjAwNDc4NTFiYmE3NTg5ZTU4YjkwMDcwMzY5NTY4MjE5NDIxNzc2YWFiZWU0Y2M2NmMzMzMyZTEwMWIzOGFhZTcxMDdhYTRiMjg4NzI3NmMxZDU5OGU4OTRiNzY4NjU5OWE0Nzg1ZjhjZjRkZDVjZTIwZjZjNWEyMTAwNmUwNWZlYzczNGQyIiwiX192IjowfSwiaWF0IjoxNjEwNjIxMzExfQ.CBWJ7dyOAZQ9LH-LXHFOgsIC4Ahkby_zTf2KJy06Ax0";
    fetch("https://api.talkie.team/join/R3cEoMPX", {
      method: "GET",
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  settingsHandler = () => {
    this.setState({
      showteam: false,
      showfeedback: false,
      showprofile: false,
      showcards: false,
      showsettings: true,
      bgcolor1: "white",
      bgcolor2: "white",
      bgcolor3: "white",
      bgcolor4: "white",
      bgcolor5: "#F5F5F6",
      color: "#3D3B66",
    });
  };
  changeImage = (event) => {
    this.setState({
      [event.target.name]: URL.createObjectURL(event.target.files[0]),
      valueimg: false,
      valueimg1: false,
    });
  };
  uploadtoggleimg = () => {
    this.setState({
      valueimg: !this.state.valueimg,
      valueimg1: !this.state.valueimg1,
    });
  };
  componentDidMount() {
    // const config={
    //     headers:{
    //         Authorization: "Bearer "+ localStorage.getItem('token')
    //     }

    // };
    //axios({ method: 'get', url: 'http://localhost:3000/user',
    // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRlYW1zIjpbXSwic3RhdHVzIjpmYWxzZSwiX2lkIjoiNjAwMDYzMzlhMjE5ZGUwNmY1NDcxMDRlIiwiTmFtZSI6IlZhcnVuIiwidXNlcm5hbWUiOiJ2YXJ1bmFkaXR5YTkwNEBnbWFpbC5jb20iLCJfX3YiOjB9LCJpYXQiOjE2MTA2Mzg1ODJ9.4Zu0hkFP09xMPSEFL6AderjeSonzBDM0E98nUZ9WRw8";
    fetch("https://api.talkie.team/dashboard", {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      alertdash: true,
    });

    // let mailid=

    axios
      .get(`https://api.talkie.team/earlyaccess_find/${this.state.mailid}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          this.setState({
            showbutton: true,
          });
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <div
          className="container2"
          style={{ backgroundColor: this.state.bgcolor }}
        >
          <div className="left">
            <div className="logo">
              <img src={logo} alt="" width="120px" height="34px"></img>
            </div>
            <div>
              <ul className="list">
                <li
                  className="item"
                  style={{ backgroundColor: this.state.bgcolor1 }}
                  onClick={this.teamHandler}
                >
                  <img className="icon2" src={teamimg} alt=""></img>{" "}
                  <span className="first">Team</span>
                </li>
                <div>
                  <li
                    className="item"
                    style={{ backgroundColor: this.state.bgcolor3 }}
                    onClick={this.profileHandler}
                  >
                    <img className="icon" src={userimg} alt=""></img>
                    <span className="first">My Profile</span>
                  </li>
                </div>
                <li
                  className="item"
                  style={{ backgroundColor: this.state.bgcolor5 }}
                  onClick={this.settingsHandler}
                >
                  <img className="icon" src={settingimg} alt=""></img>
                  <span className="first">Settings</span>
                </li>
                <li
                  className="item"
                  style={{ backgroundColor: this.state.bgcolor2 }}
                  onClick={this.feedbackHandler}
                >
                  <img className="icon" src={feedbackimg} alt=""></img>
                  <span className="first">Feedback</span>
                </li>
              </ul>
            </div>
            <div
              className="j-team"
              style={{
                backgroundColor: this.state.bgcolor4,
                color: this.state.color1,
              }}
              onClick={this.joinTeamHandler}
            >
              Join Team
            </div>
            {/* {
              this.state.showbutton?( */}
            <div
              className="team"
              style={{
                backgroundColor: this.state.bgcolor6,
                color: this.state.color2,
                marginTop: "20px",
              }}
              onClick={this.createTeamHandler}
            >
              Create Team
            </div>
            {/* ):null */}
          </div>
          <div className="right">
            <div className="navbar">
              <span
                onClick={() => {
                  localStorage.clear();
                  this.logout();
                }}
                className="logout"
              >
                Logout <img className="logouticon" src={logimg} alt=""></img>
              </span>
            </div>
            <div className="body">
              {this.state.showteam ? (
                <div className="teamblock">
                  {/* <Team /> */}
                  <BrowserRouter>
                    <Switch>
                      <Route exact path="/team" component={Team} />
                      <Redirect to="/team" />
                    </Switch>
                  </BrowserRouter>
                </div>
              ) : null}
              {this.state.showfeedback ? (
                <div className="feedbackblock">
                  <BrowserRouter>
                    <Switch>
                      <Route exact path="/feedback" component={Feedback} />
                      <Redirect to="/feedback" />
                    </Switch>
                  </BrowserRouter>
                </div>
              ) : null}
              {this.state.showprofile ? (
                <div className="profileblock">
                  <BrowserRouter>
                    <Switch>
                      <Route
                        exact
                        path="/profile"
                        component={() => (
                          <Profile
                            bgcolor={this.state.bgcolor}
                            image={this.state.image}
                            change={this.changeImage}
                            showupload1={this.state.valueimg1}
                            uploadToggle1={this.uploadtoggleimg}
                          />
                        )}
                      />
                      <Redirect to="/profile" />
                    </Switch>
                  </BrowserRouter>
                </div>
              ) : null}
              {this.state.showsettings ? (
                <div className="settingsBlock">
                  <BrowserRouter>
                    <Switch>
                      <Route exact path="/settings" component={Settings} />
                      <Redirect to="/settings" />
                    </Switch>
                  </BrowserRouter>
                </div>
              ) : null}
              {this.state.showcards ? (
                <div className="createTeamBlock">
                  <BrowserRouter>
                    <Switch>
                      <Route
                        exact
                        path="/createTeam"
                        component={() => (
                          <CreateTeam
                            toggle={this.createTeamHandler}
                            image1={this.state.image}
                            change1={this.changeImage}
                            showUploadfile={this.state.valueimg}
                            uploadToggle={this.uploadtoggleimg}
                          />
                        )}
                      />
                      <Redirect to="/createTeam" />
                    </Switch>
                  </BrowserRouter>
                </div>
              ) : null}
              <img className="ellipse" src={ellipse} alt=""></img>
              <img className="help" src={helpimg} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
