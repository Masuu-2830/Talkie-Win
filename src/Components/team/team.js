import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Tooltip } from 'reactstrap';
import CreateTeam from "../CreateTeam/createTeam";
import "./team.css";
import Img40 from "../../icons/Ellipse 40.png";
import Img452 from "../../icons/Group 452.png";
import Delete from "../../icons/Icon-material-delete-forever.png";
import DeleteMe from "../DeleteTeam/deleteteam";
import dots from "../../icons/Group 438.png";
import bg from "../../icons/Ellipse 21.png";
import plus from "../../icons/Group 262.png";
import arrow from "../../icons/Group 460.png";
import Email from "../Email/email";
import axios from "axios";
import InviteTeam from "../InviteMembers/InviteMembers";

class Team extends Component {
  state = {
    showdelete: false,
    showemail: false,
    showInvite:false,
    arr: [],
    accessToken: "",
    ttopen: false,
    ttopen1:false,
    ttopen2:false
  };
 handleTooltip = () =>{
     this.setState({
       ttopen: !this.state.ttopen
     })
 };
 handleTooltip1 = () =>{
  this.setState({
    ttopen1: !this.state.ttopen1
  })
};
handleTooltip2 = () =>{
  this.setState({
    ttopen2: !this.state.ttopen2
  })
};
  constructor() {
    let ar = [];
    super();
    if (localStorage.getItem("profileData")) {
      const data = JSON.parse(localStorage.getItem("profileData"));
      this.setState({
        ...this.state,
        accessToken: data.user.stsTokenManager.accessToken,
      });
    }
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRlYW1zIjpbXSwic3RhdHVzIjpmYWxzZSwiX2lkIjoiNjAwYjFhYmZiMGYwYjc1ZDNkY2IzYzdiIiwiTmFtZSI6IlZhcnVuIEFkaXR5YSIsInVzZXJuYW1lIjoidmFydW4xMjM0QGdtYWlsLmNvbSIsInNhbHQiOiJkOTAxNDVhZjQ3ZjBkNjUwMDJiNjM4MWQ5ZWM5ZjVkZDgyYzFkYTkxMmFkMzhhZDk0MTcyN2JjYjZiOGE0MGU1IiwiaGFzaCI6ImE4MDVlNzk1ZWQ0ZWY4ZDc5MzUyMjYyOTQzYzBiYzU0N2U2NzEwNGNmNjBiYmQyZDI2MjBiMDNhZWIyNzNlYjk5YWVjMWVmZGJkMzEwZWE2MmU3Y2ZiY2QxN2ExOGE2MWQ2Y2JkMGNhZWEyZWQ1MzE4YzQ5ZDRjZjIyODMwNWIwNmNiYjMxZGVmNjc2YjZmODg3NjgwZGE3ZGIzYWFiZTViNWU3ZTZkMWEzMTFkNDk4YmU3NzYxMGY2NmEzOGU4NjkyMjljNGE5YzAxNTQwM2JjN2IwNmJhNjkyNDg5NzRjMjM4Y2M1MmViMWQzNDkxZGFjZTg0NzM0OTFmYzJmYmU4Mjg0NzJjMTJlYjIwNjRjYWFjYjQ2Nzk1Mjg0NTA2NDY1ZmIyMmUyMzkxNGRiNzE3YWI2MWU5YjJhZTM3ZDdkMTkwZTJkMjI0ZDg5ZTEzYWUyM2M5MzU5MGQyMWQ4NDQxN2FhOTM4YjNiODFlYjllZDY0OWNkMGYyYzczYmU4YThkZTZjNWJlNjQ3MzhlNDk1MWQ3YzU2OGJiOWMxZDJlMmY5YWI5NDlkYzZlNDdhMGI3MDRiOTY3NTg4M2Y4YTliYjQxMWQwY2E0OGRiYzc4NWE2ZGY5NDNjMzdiMTM2ZDhmYjcwYzhhY2FlOTJjM2Y1NjdiNzU0YzVjMzI4N2YzMmY4NDYyMjY5ODM4MTYxZWRhMjMwMGRkZTM2NDg3YWNjYmYzMDRlMjNmYjMyMDBiZjFhZjFjYjUwMmIxMjIxZDBhYzc5NDk4ZTVhY2JjMWU5M2RmM2YxYWU4MjU0ZjcyZWQ1OTQyNjk2NTg2NDNjMzRkOTM1ZjkxYzViMjU4Y2NlNTVjNDE2ZDU0ZjQ1YTUyYTZjMDFlZmIwYmU1MWU2MzJlMmM0NTVkNjBmZjkwYTkxM2Q3MzE2MzU1MTk3MDZhZDVkZDRkNGMxYWI5ZDI5MzRjMjllYmE2OWY1YmNjNDU4M2Q1YmMyMjYxZTg3MTU1ZjhkZWJhYzc5Y2I2NjRlMGRmMDMwMWZmZGNiMTU4OGE4Yzc0YjU1NTIyNDM5MzdjNDYyNmQ5OTljNWNiOTg4NDVkM2FiZGMxMjVkMGUwZjJiODhhODhhOGM5ODg4NmU1OTU4MTQwN2EzM2Q0ODNjY2M4ZWE4NGQ5ZDY0NTEwZmI4YTZkMmM4ZTY5NDI1YTFlNmYwODEzODg3Y2FkNTczMTU0M2UzYzAxNmZlOTExYjhhNDE2YWUzY2M0ZGFiNjNlZDMxZDQzNzBiNjE1YTIxMWU3Mjc0Zjc0N2QxNzc3MGQ2MDkxODUzNmFlNGM4NGEzODQ1YjNhZDRlMGUwZDg4YWQ4NjQzNTUzMGI2NGI2MWIiLCJfX3YiOjB9LCJpYXQiOjE2MTEzNDA0ODB9.pnB_4qOv6eW5yp1j02xx0abtoDrQ3b7i6Jp_Auxw9l0";
    // fetch("https://api.talkie.team/dashboard", {
    //   method: "GET",
    //   headers: {
    //     Authorization: token,
    //   },
    // });
    axios
      .get("https://api.talkie.team/dashboard", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log("response from get api : ", res);
        ar.push(res.data);
        console.log(ar);
        return res;
      })
      .catch((err) => console.error(err));
    // .then((response) => {
    //   console.log("response from get api : ", response.data);
    //   ar.push(response.data);
    //   console.log(ar);
    //   return response;
    // })

    // .catch((err) => {
    //   console.log(err);
    // });
  }
  handleInvite=()=>{
    this.setState({
      showInvite: !this.state.showInvite
    });
  };

  handleEmail = () => {
    this.setState({
      showemail: !this.state.showemail,
    });
  };
  deleteteam = () => {
    // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRlYW1zIjpbXSwic3RhdHVzIjpmYWxzZSwiX2lkIjoiNjAwMDIxN2RkMTI1NzYyMGU4N2FkMDU4IiwiTmFtZSI6IlZhcnVuIiwidXNlcm5hbWUiOiJiaGF0aXZhcnVuMTIzQGdtbWFpbC5jb20iLCJwaWMiOiJodHRwczovL3RhbGtpZS1pbWFnZXMuczMuYW1hem9uYXdzLmNvbS9pbWFnZXMlMjAlMjgxJTI5LmpwZWciLCJzYWx0IjoiZWM1OGMxMDA4N2U0MGM2N2FkODU5NTM3YTAwOTM3MzAyNTRjYmE3YWRlNDBjZmU1MTJiNjE4MTcwZmRiN2MwNyIsImhhc2giOiIwMTlkZGJjMGNmZjMzNjFjMWJkMmJmYTkzNTA2M2Y4M2JkYjk0NTg0NmY5YjMwODRmZWIzYTBmMGIyZjg3M2JkMmQ4OWEwMWQ0YWNhNTEzOGJkZTMyMmZhNzYwYzVhNGU4ZTYyOWQyMWFlZWY4YmY0OWEzMTE4ODhjYmQzNDYwZTUxMzQ5NjA5ZDkyYjg3MzJhNTJhMzc0MzQ2YWI4NTZmMjZkN2RmZDQ5NmE4NDQzMzU1NjQ1ZjRiZWQ4Yjk1MWI4M2Q3Y2YyODFkNjg1ZTgwYjg0NjBlYzc4YTczMmY0ZTJhMDJlMjk3NTZlNDVmZTI4Yjc4ZGY4ZTUxN2RjMzg2NWFlZmRlMzA1YTE0MTgwNDFlMGNiMGU5YTBjZTc2YzgwZjJjNWQzNjg5MjU5NWM4ZTdjOTE1OTQ4N2JiNTM3YTljMmM3NGVkYTBkZGYyM2FlYzMzOTA0OTMwMDZmZjAwOTkxZDI1ODNiMjE1YTE3NDhiMjFmYzJlZmUxYzJkMDBjMDJhNzI0ZDY4MzE0ZDRjMjZjMmY0OWU5ODVlMDU0MzY3YjZhYmM4YmJhYTU4M2YyM2RmNzhhYTRlMjk1YTRjNmRhZjE3MzVkMWM0YzQxYjhiMjFlNjkzZGFiNjczOGY3MWEzODdlM2JkODVjODRhNjY0MmM2YzI4YzJmYzNkZmJjMDE4N2ExNjcxZmQ4ZjMyMGI1N2Q4MGM1YjY3ZWEzZTY0NjE2ODMxNzA2ZTdlZDM1NmNmMDYwMzM0YTgyNGMxNzA4YTFkOTBmZDhiZWI4NTA3ODAzNTAzMjg0MmE2ZGFkMzdlYmZjMTBiOTUwMThmZWVkZDlkMzZlYTc2YjZhNTJhZjgwYmQzMWVkMjJhNDBkZjAyMWE3NjUzODBjMGIxN2I5MTczYzYyOWVhMmY0NDk2Zjc2OTkxNGIzMmI0NzQ1ZmRjZjY0YjFjMzY4MzI0NTE3NTlmOWI1NDAwYzUwMDNjOWE2ZWU4Y2YwOGQwNjAwOGIyMjgyMDgzMTRkYjBhMmQwY2NjMThkODIwZjE0MzVlZWFhMTQ0Zjc2YjBiNzNlMjc4ZTc1MTc4ZDZiNDQ3NDIyNjBjODg5ZWI0ZTY2MWQ1NmUyMDNiZTliYzM0N2FkNDljMjQwNzc0Yjk1ZTE1NmJiZjkwZDU3YjU3NTQxNjc0ZDQ5MDAyMjAwNDc4NTFiYmE3NTg5ZTU4YjkwMDcwMzY5NTY4MjE5NDIxNzc2YWFiZWU0Y2M2NmMzMzMyZTEwMWIzOGFhZTcxMDdhYTRiMjg4NzI3NmMxZDU5OGU4OTRiNzY4NjU5OWE0Nzg1ZjhjZjRkZDVjZTIwZjZjNWEyMTAwNmUwNWZlYzczNGQyIiwiX192IjowfSwiaWF0IjoxNjEwNjIxMzExfQ.CBWJ7dyOAZQ9LH-LXHFOgsIC4Ahkby_zTf2KJy06Ax0";
    fetch("https://api.talkie.team/deleteTeam/HtNoqLN6", {
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
    this.setState({
      showdelete: !this.state.showdelete,
    });
  };

  render() {
    return (
      <div className="box2">
        <div className="top1">
          <img className="dp" src={Img40} alt=""></img>
          <div className="topinput">{this.props.head}</div>
          <img className="bgdots" src={bg} alt=""></img>
          <img className="dots3" src={dots} alt=""></img>
        </div>
          <Modal isOpen={this.state.showdelete} toggle={this.deleteteam} className={this.props.className}>
            <DeleteMe click3={this.deleteteam} />
          </Modal>
        <div className="members">
          <div className="initials">
            <div className="mem">
              <img className="initials1" src={Img452} alt=""></img>
              <div className="caption">Andy James</div>
            </div>
            <div className="mem">
              <img className="initials1" src={Img452} alt=""></img>
              <div className="caption">Andy James</div>
            </div>
            <div className="mem">
              <img className="initials1" src={Img452} alt=""></img>
              <div className="caption">Andy James</div>
            </div>
            <div className="mem">
              <img className="initials1" src={Img452} alt=""></img>
              <div className="caption">Andy James</div>
            </div>
            <div className="mem">
              <img className="initials1" src={Img452} alt=""></img>
              <div className="caption">Andy James</div>
            </div>
            <img
            className="arrow2"
            src={arrow}
            alt=""
            onClick={this.handleEmail}
            id="TooltipExample"
          ></img>
            <Tooltip placement="bottom" isOpen={this.state.ttopen} target="TooltipExample" toggle={this.handleTooltip}>
                  Show E-mails of Members
            </Tooltip>

          <img className="plus2" src={plus} alt="" onClick={this.handleInvite} id="TooltipExample1"></img>
          </div>
          <Tooltip placement="bottom" isOpen={this.state.ttopen1} target="TooltipExample1" toggle={this.handleTooltip1}>
                  Invite Members
            </Tooltip>
         
        </div>
        <Modal isOpen={this.state.showInvite} toggle={this.handleInvite} className={this.props.className}>
        <div className='inviteBlock'>
              <InviteTeam 
                  click9={this.handleInvite}
              />
            </div>
            </Modal>
        <div className="descr">{this.props.teamMembers}</div>
        <div className="descr">{this.props.description1}</div>
        <div className="descr">{this.props.description2}</div>
        <div className="last">
          
          <img src={Delete} alt="" onClick={this.deleteteam} id="TooltipExample2"></img>
          <Tooltip placement="bottom" isOpen={this.state.ttopen2} target="TooltipExample2" toggle={this.handleTooltip2}>
                  Delete Team
            </Tooltip>

          <button className="lastButton">Launch Widget</button>
        </div>
        <div className="create">
          <CreateTeam />
        </div>
        <Modal isOpen={this.state.showemail} toggle={this.handleEmail} className={this.props.className}>
        
          <div className="emailBlock">
            <Email click8={this.handleEmail} />
          </div>
          </Modal>
      </div>
    );
  }
}

export default Team;
