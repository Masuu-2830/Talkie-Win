import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip } from 'reactstrap';
import "./profile.css";
import img1 from "../../icons/Group 255.png";
import Upload from "../Upload/upload";
import image from "../../icons/Email Verified.png";
import imageverify from "../../icons/Icon material-verified-user.png";
// import axios from 'axios';
class Profile extends Component {
  state = {
    col: "rgba(0, 0, 0, 0)",
    name: "",
    description: "",
    password: "",
    verified: false,
    email: "",
    accessToken: "",
    modal:false
  };
  handleTooltip = () =>{
    this.setState({
      ttopen: !this.state.ttopen
    })
};

  toggle = () => {
       this.setState({
         modal:!this.state.modal
       });
  };
  componentDidMount() {
    if (localStorage.getItem("profileData")) {
      const data = JSON.parse(localStorage.getItem("profileData"));
      console.log(data);
      // this.setState({...this.state,email:data.user.email});
      // this.setState({...this.state,accessToken:data.user.stsTokenManager.accessToken});
      this.state = {
        ...this.state,
        email: data.user.email,
        password: data.user.password,
        name: data.user.displayName,
      };
      this.state = {
        ...this.state,
        accessToken: data.user.stsTokenManager.accessToken,
      };
    }
    console.log(this.state);
  }
  constructor() {
    super();
    if (localStorage.getItem("profileData")) {
      const data = JSON.parse(localStorage.getItem("profileData"));
      console.log(data);
      // this.setState({...this.state,email:data.user.email});
      // this.setState({...this.state,accessToken:data.user.stsTokenManager.accessToken});
      this.state = {
        ...this.state,
        email: data.user.email,
        password: data.user.password,
        name: data.user.displayName,
      };
      this.state = {
        ...this.state,
        accessToken: data.user.stsTokenManager.accessToken,
      };
    }
    console.log(this.state);
  }
  verifyemail = () => {
    fetch("https://api.talkie.team/profile", {
      method: "GET",
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            verified: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    let image = document.querySelector(".img1");
    // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRlYW1zIjpbXSwic3RhdHVzIjpmYWxzZSwiX2lkIjoiNjAwMDYzMzlhMjE5ZGUwNmY1NDcxMDRlIiwiTmFtZSI6IlZhcnVuIiwidXNlcm5hbWUiOiJ2YXJ1bmFkaXR5YTkwNEBnbWFpbC5jb20iLCJfX3YiOjB9LCJpYXQiOjE2MTA2Mzg1ODJ9.4Zu0hkFP09xMPSEFL6AderjeSonzBDM0E98nUZ9WRw8";

    let data = {
      name: this.state.name,
      password: this.state.password,
      profile_pic: image.src,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: this.state.accessToken,
        "Access-Control-Allow-Origin": true,
        cors: "cors",
      },
      body: JSON.stringify(data),
    };
    fetch("https://api.talkie.team/edit_profile", requestOptions)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch('https://talkie-dc17d-default-rtdb.firebaseio.com/verify:email.json')
    //     .then(response => response.json())
    //     .then(json => console.log(json));

    // axios.post("verify:email",{data: data},
    // {headers: {"Access-Control-Allow-Origin": true}}).then((res)=>{
    //     console.log(res);
    // })
    // .catch(err=>{
    //     console.log(err);
    // })
  };
  //
  render() {
    return (
      <div className="box1 col-12">
        <div className=" imagedp col-12">
          <img
            className="img1"
            src={this.props.image}
            alt=""
            onClick={this.toggle}
            id="TooltipExample"
          ></img>
          <Tooltip placement="right" isOpen={this.state.ttopen} target="TooltipExample" toggle={this.handleTooltip}>
                  Change Profile Image
            </Tooltip>
        </div>
        

      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
      <Upload 
      click2={this.toggle}/>



        {/* <ModalBody>
          
        </ModalBody> */}
        {/* <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
    
        {/* {this.props.showupload1 ? (
          <Upload
            click1={this.props.change}
            click2={this.props.uploadToggle1}
          />
        ) : null} */}
        <div className="top col-12">
          <div className="col-4 first">
            <label className="label" htmlFor="first">
              First Name
            </label>
            <input
              id="first"
              name="firstname"
              className="input1"
              type="text"
              placeholder="Amogh"
              onChange={this.handleChange}
              value={this.state.name}
            ></input>
          </div>
          <div className="col-4">
            <label htmlFor="last">Last Name</label>
            <input
              id="last"
              name="lastname"
              className="input1"
              type="text"
              placeholder="Tiwari"
              onChange={this.handleChange}
              value={this.state.lastname}
            ></input>
          </div>
          <div className="col-4">
            <label className='desclabel' htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              className="input1 desclabel"
              type="text"
              placeholder="Decibell tech founder"
              onChange={this.handleChange}
              value={this.state.description}
            ></input>
          </div>
        </div>
        <div className="col-12">
          <label className='passlabel' htmlFor="password">Password</label>
          <input
            className="input1 passlabel"
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          ></input>
        </div>
        <div className="col-12 mail">
          <div className="col-6 email">
            <label htmlFor="email">Email</label>
            <input
              className="input1 description"
              type="text"
              id="email"
              readOnly
              // value="itsamoghtiwari@gmail.com"
              value={this.state.email}
            ></input>
          </div>
          <div className="verified col-6">
            {this.state.verified ? (
              <div>
                <img
                  style={{ paddingRight: "4px" }}
                  src={image}
                  alt=""
                  className="verified-img"
                ></img>
                <img
                  style={{ paddingBottom: "2px" }}
                  src={imageverify}
                  alt=""
                  className="verified-img"
                ></img>
              </div>
            ) : (
              <button className='verification' onClick={this.verifyemail}>Send Verification </button>
            )}
          </div>
        </div>

        <button onClick={this.handleSubmit} className="save-btn">
          Save
        </button>
      </div>
    );
  }
}

export default Profile;
export const color = "{this.state.col}";
