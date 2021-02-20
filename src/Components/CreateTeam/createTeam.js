import React, { Component } from "react";
import "./createTeam.css";
import Close from "../../icons/Group 429.png";
import Upload from "../Upload/upload";
import plus from "../../icons/Group 262.png";
import axios from "axios";

class CreateTeam extends Component {
  state = {
    head: " ",
    description1: " ",
    description2: " ",
    description3: " ",
    accessToken: "",
    members: [],
  };
  constructor() {
    super();
    if (localStorage.getItem("profileData")) {
      const data = JSON.parse(localStorage.getItem("profileData"));
      this.setState({
        ...this.state,
        accessToken: data.user.stsTokenManager.accessToken,
      });
    }
  }
  handleInputHead = (event) => {
    this.setState({
      head: event.target.value,
    });
  };
  handleInputteam = (event) => {
    if (event.charCode === 13) {
      let emailMembers = this.state.members
        .concat([event.target.value])
        .concat(" ");
      this.setState({
        members: emailMembers,
      });
      event.target.value = null;
    }
  };
  handleInputDes1 = (event) => {
    this.setState({
      description1: event.target.value,
    });
  };
  handleInputDes2 = (event) => {
    this.setState({
      description2: event.target.value,
    });
  };
  handleInputDes3 = (event) => {
    this.setState({
      description3: event.target.value,
    });
  };
  handleClick = () => {
    this.props.toggle();
  };

  //
  handleSubmit = (event) => {
    event.preventDefault();
    //   console.log(this.state);

    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRlYW1zIjpbImVjNjE2NjQwIiwiZWM2MTY2NDAiLCJlYzYxNjY0MCIsImVjNjE2NjQwIiwiNDgxOTI5YTQiLCI0ODE5MjlhNCJdLCJzdGF0dXMiOmZhbHNlLCJfaWQiOiI2MDE0MjhmYmZlOTk3ZDMwNTVhMjY0ZjMiLCJOYW1lIjoiVmFydW4gQWRpdHlhIiwidXNlcm5hbWUiOiJoYXRpdmFydW4xMjM0QGdtYWlsLmNvbSIsIl9fdiI6MH0sImlhdCI6MTYxMjEwNTI2OH0.6CsiA_-ZzZ4VUglAzNEfMT8xZYwldbX2ODVPp9F1_O8";
    let data = {
      name: this.state.head,
      invite: this.state.members,
      description: this.state.description1
      
    };
    console.log(data);
    const requestOptions = {
      method:'POST',
      headers :{ "Authorization" : token} ,
      body: JSON.stringify(data),
    };
    console.log(requestOptions.body);
       fetch("https://api.talkie.team/createTeam", requestOptions)
      .then((response)=>{
          console.log("response from post api : ", response);

    // localStorage.setItem("Authorization", response.Authorization);
      })
    // axios
    //   .post(
    //     "https://api.talkie.team/createTeam",
    //     { body: {"name" : "hi"} },
    //     { headers: {
    //                    Authorization: token
    //                   // "Access-Control-Allow-Origin": "*", 
    //                 } }
    //     )
      
      // .then((res) => console.log( "input from post api", res))
      // .catch((err) => console.error(err));
  };

  //

  render() {
    return (
      <div className='div7'><img
      className="closeimage"
      src={Close}
      alt=""
      onClick={this.handleClick}
    ></img>
      <div className="box7">
        
        <form className="form1" onSubmit={this.handleSubmit} action="">
          <div className="header">
            <img
              className="img"
              src={this.props.image1}
              alt=""
              onClick={this.props.uploadToggle}
            ></img>
            <input
              className="input heading"
              type="text"
              placeholder="Team Name"
              onChange={this.handleInputHead}
            ></input>
          </div>
          <input
            className="input"
            type="email"
            placeholder="Add Team Members"
            onKeyPress={this.handleInputteam}
          ></input>
          {this.state.members.length ? (
            <ul className="showMembers">
              <li className="listMembers">
                {this.state.members.map((member) => {
                  return member;
                })}
              </li>
            </ul>
            
          ) : null}
          <img className="plus2" src={plus} alt="" onClick={this.handleInvite}></img>
          <input
            className="input"
            type="text"
            placeholder="Description"
            onChange={this.handleInputDes1}
          ></input>
          <input
            className="inputdescription"
            type="text"
            onChange={this.handleInputDes2}
          ></input>
          <input
            className="inputdescription"
            type="text"
            onChange={this.handleInputDes3}
          ></input>
          <div>
            <button className="button">Confirm</button>
          </div>
        </form>
        {this.props.showUploadfile ? (
          <Upload
            click1={this.props.change1}
            click2={this.props.uploadToggle}
          />
        ) : null}
      </div>
      </div>
    );
  }
}

export default CreateTeam;
