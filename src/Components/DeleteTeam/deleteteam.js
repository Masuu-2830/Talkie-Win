import React from 'react';
import './deleteteam.css';
import Close from '../../icons/Group 429.png';
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
  

const DeleteMe =(props) => {
    
        return (
           
            <div className='box6'>
                <img className='closedelete' src={Close} onClick={props.click3} alt=""></img>
                <div className='dv'>
                <h4 className='deleteheader'>Delete Team?</h4>
                <span className='span'>Are you sure you want to delete this Team? This action cannot be undone.</span>
            <div className='buttons'>
                <button className='cancel-btn'>Cancel</button>
                <button onClick={props.click3} className='delete-btn'>Delete</button>
            </div>
            </div>
            </div>            

         );
    }

export default DeleteMe;
