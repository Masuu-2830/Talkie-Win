import React, { Component } from 'react';
import Copyimg from '../../icons/iconfinder_fill-web5-12_5084656.png';
import Close from '../../icons/Group 429.png';
import './InviteMembers.css';

class InviteTeam extends Component {

    state = {
        copySuccess: false
      }

    copyCodeToClipboard = () => {
        const el = this.input
        el.select()
        document.execCommand("copy")
        this.setState({copySuccess: true})
      }

    render() { 
        return ( 
            <div className='box9'>

                <img className='closeInvite' src={Close} alt="" onClick={this.props.click9}></img>
                <h1 className='head9'>Invite Team Members</h1>
                <h4 className='h49'>Copy this code and send it to people you want to connect with</h4>
                <div className='inputcopybox'>
                    <input className='input9' type="text"
                    ref={(input) => this.input = input}></input>
                    <img src={Copyimg} alt="" onClick={() => this.copyCodeToClipboard()}></img>
                </div>
                <div className='inputmailbox'>
                    <h4 className='h49'>Type a work-mail</h4>
                    <input placeholder='Work-mail' className='input9' type='text'></input>
                </div>
                <div className='bottom9'>
                    <button className='button9'>Send Invite</button>
                </div>
                {
            this.state.copySuccess ?
            <div style={{"color": "green"}}>
              Success!
            </div> : null
          }
            </div>
         );
    }
}
 
export default InviteTeam;