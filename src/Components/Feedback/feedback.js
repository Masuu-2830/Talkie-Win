import React, { Component } from 'react';
import './feedback.css';
import { Alert } from 'reactstrap';
import axios from 'axios';


const initialState = {
  feedback: "",
  feedbackError: "",
  accessToken:"",
  subfeed:false
};
class Feedback extends Component {
    constructor(props) {
    super(props);
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    if(localStorage.getItem("profileData")){
        const data = JSON.parse(localStorage.getItem("profileData"));
        this.setState({...this.state,accessToken:data.user.stsTokenManager.accessToken});
    }

  }
state = initialState;
handleChange=(event) =>{
    this.setState({
      feedback: event.target.value,
      subfeed:false
    });
};

validate = () => {
  let feedbackError = "";
  if (!this.state.feedback) {
    feedbackError = "feedback cannot be blank";
  }

  if (feedbackError) {
    this.setState({ feedbackError });
    return false;
  }

  return true;
};

handleSubmit=(event)=> {
  event.preventDefault()
  console.log(this.state);
  const isValid = this.validate();
  if (isValid) {
    console.log("Validated");
    let Feedback=document.querySelectorAll(".userfeedback");
    console.log(Feedback.innerHTML)
    let type='';
    if(document.getElementById('bug').checked){
        type='bug';
        
    }
    else if(document.getElementById('comment').checked){
        type='comment';
    }
    else if(document.getElementById('other').checked){
        type='other';
    }
    const data = {
      Message: Feedback.innerHTML,
      Type:type
    };
    // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InRlYW1zIjpbXSwic3RhdHVzIjpmYWxzZSwiX2lkIjoiNjAwMDIxN2RkMTI1NzYyMGU4N2FkMDU4IiwiTmFtZSI6IlZhcnVuIiwidXNlcm5hbWUiOiJiaGF0aXZhcnVuMTIzQGdtbWFpbC5jb20iLCJwaWMiOiJodHRwczovL3RhbGtpZS1pbWFnZXMuczMuYW1hem9uYXdzLmNvbS9pbWFnZXMlMjAlMjgxJTI5LmpwZWciLCJzYWx0IjoiZWM1OGMxMDA4N2U0MGM2N2FkODU5NTM3YTAwOTM3MzAyNTRjYmE3YWRlNDBjZmU1MTJiNjE4MTcwZmRiN2MwNyIsImhhc2giOiIwMTlkZGJjMGNmZjMzNjFjMWJkMmJmYTkzNTA2M2Y4M2JkYjk0NTg0NmY5YjMwODRmZWIzYTBmMGIyZjg3M2JkMmQ4OWEwMWQ0YWNhNTEzOGJkZTMyMmZhNzYwYzVhNGU4ZTYyOWQyMWFlZWY4YmY0OWEzMTE4ODhjYmQzNDYwZTUxMzQ5NjA5ZDkyYjg3MzJhNTJhMzc0MzQ2YWI4NTZmMjZkN2RmZDQ5NmE4NDQzMzU1NjQ1ZjRiZWQ4Yjk1MWI4M2Q3Y2YyODFkNjg1ZTgwYjg0NjBlYzc4YTczMmY0ZTJhMDJlMjk3NTZlNDVmZTI4Yjc4ZGY4ZTUxN2RjMzg2NWFlZmRlMzA1YTE0MTgwNDFlMGNiMGU5YTBjZTc2YzgwZjJjNWQzNjg5MjU5NWM4ZTdjOTE1OTQ4N2JiNTM3YTljMmM3NGVkYTBkZGYyM2FlYzMzOTA0OTMwMDZmZjAwOTkxZDI1ODNiMjE1YTE3NDhiMjFmYzJlZmUxYzJkMDBjMDJhNzI0ZDY4MzE0ZDRjMjZjMmY0OWU5ODVlMDU0MzY3YjZhYmM4YmJhYTU4M2YyM2RmNzhhYTRlMjk1YTRjNmRhZjE3MzVkMWM0YzQxYjhiMjFlNjkzZGFiNjczOGY3MWEzODdlM2JkODVjODRhNjY0MmM2YzI4YzJmYzNkZmJjMDE4N2ExNjcxZmQ4ZjMyMGI1N2Q4MGM1YjY3ZWEzZTY0NjE2ODMxNzA2ZTdlZDM1NmNmMDYwMzM0YTgyNGMxNzA4YTFkOTBmZDhiZWI4NTA3ODAzNTAzMjg0MmE2ZGFkMzdlYmZjMTBiOTUwMThmZWVkZDlkMzZlYTc2YjZhNTJhZjgwYmQzMWVkMjJhNDBkZjAyMWE3NjUzODBjMGIxN2I5MTczYzYyOWVhMmY0NDk2Zjc2OTkxNGIzMmI0NzQ1ZmRjZjY0YjFjMzY4MzI0NTE3NTlmOWI1NDAwYzUwMDNjOWE2ZWU4Y2YwOGQwNjAwOGIyMjgyMDgzMTRkYjBhMmQwY2NjMThkODIwZjE0MzVlZWFhMTQ0Zjc2YjBiNzNlMjc4ZTc1MTc4ZDZiNDQ3NDIyNjBjODg5ZWI0ZTY2MWQ1NmUyMDNiZTliYzM0N2FkNDljMjQwNzc0Yjk1ZTE1NmJiZjkwZDU3YjU3NTQxNjc0ZDQ5MDAyMjAwNDc4NTFiYmE3NTg5ZTU4YjkwMDcwMzY5NTY4MjE5NDIxNzc2YWFiZWU0Y2M2NmMzMzMyZTEwMWIzOGFhZTcxMDdhYTRiMjg4NzI3NmMxZDU5OGU4OTRiNzY4NjU5OWE0Nzg1ZjhjZjRkZDVjZTIwZjZjNWEyMTAwNmUwNWZlYzczNGQyIiwiX192IjowfSwiaWF0IjoxNjEwNjIxMzExfQ.CBWJ7dyOAZQ9LH-LXHFOgsIC4Ahkby_zTf2KJy06Ax0";
    const requestOptions={
        method: "POST",
        headers: {"Authorization": this.state.accessToken},
        body: JSON.stringify(data),
    }
     fetch("https:\/\/api.talkie.team\/feedback", requestOptions)
    .then((response)=>{
        console.log(response);
    })
    .catch(err=>{
        console.log(err);
    });

    // axios.post("feedback",data).then(response => {
    //         console.log(response)
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })

      }
      this.setState({
        feedback:" ",
        subfeed:true
      });
      

    }



    render() {
        return (
            <div className="box">
              {
                this.state.subfeed?
                <Alert color="success">
        Your feedback has been successfully submitted :)
      </Alert>:null
              }
                <h3>Send us some feedback!</h3>
                <h4>Found a bug? Have a suggestion? Share your valuable feedback!</h4>
                <form onSubmit={this.handleSubmit} className='form7'>
                <div >
                    <textarea className="userfeedback" value={this.state.feedback} className="textbox" onChange={this.handleChange} rows="4" cols ="10" placeholder="Enter your feedback here!"></textarea>
                </div>
                <ul className="ul">
                    <li>
                    <input type='radio' name='feedback' id='bug' className="list2"></input>
                    <label htmlFor='bug'> Bug </label>
                    </li>
                    <li>
                    <input type='radio' id='comment' name='feedback' className="list2"></input>
                    <label htmlFor='comment'> Comment </label>
                    </li>
                    <li>
                    <input type='radio' id='other' name='feedback' className="list2"></input>
                    <label htmlFor='other'> Other </label></li>
                </ul>
                
                <div className="bottom">
                  <div className="bottom2">
                    <span className='bot'>Terms&Conditions </span>
                    <span className='bot'>Privacy Policy </span>
                    <span className='bot'>Security </span>
                    </div>
                   <button type="submit" className='btn2' onClick={this.handleSubmit}>Submit</button>
                </div>
                </form>
            </div>
         );
    }
}

export default Feedback;
