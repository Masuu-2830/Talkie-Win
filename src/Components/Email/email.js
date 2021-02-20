import React, { Component } from 'react';
import Close from '../../icons/Group 429.png';
import Round from '../../icons/Ellipse 40.png';
import './email.css'

class Email extends Component { 
    
    render() { 
        return ( 
            <div className='box8'>
               <div className='head8'>
               <span className='header8'>Members</span>
               <span className='header8'>E-Mail</span>
               <img className='headImage' src={Close} alt='' onClick={this.props.click8}></img>
               </div>
               <ul className='ul8'>
                  <li className='list8'>
                      <img className='titleImg' src={Round} alt=''></img>
                      <span className='title8'>Andy Johns</span>
                      <span className='email8'>andy.j@gmail.com</span>
                      <span className='remove8'>Remove</span>
                  </li>
                  <li className='list8'>
                      <img className='titleImg' src={Round} alt=''></img>
                      <span className='title8'>Andy Johns</span>
                      <span className='email8'>andy.j@gmail.com</span>
                      <span className='remove8'>Remove</span>
                  </li>
                  <li className='list8'>
                      <img className='titleImg' src={Round} alt=''></img>
                      <span className='title8'>Andy Johns</span>
                      <span className='email8'>andy.j@gmail.com</span>
                      <span className='remove8'>Remove</span>
                  </li>
                  <li className='list8'>
                      <img className='titleImg' src={Round} alt=''></img>
                      <span className='title8'>Andy Johns</span>
                      <span className='email8'>andy.j@gmail.com</span>
                      <span className='remove8'>Remove</span>
                  </li>
               </ul>
               <button className="button8">Invite</button>

            </div>
         );
    }
}
 
export default Email;