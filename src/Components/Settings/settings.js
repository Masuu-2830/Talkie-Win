import React, { Component } from 'react';
import Microphone from '../../icons/Group 453.png';
import './settings.css';

class Settings extends Component {
    render() { 
        return ( 
            <div className= "box4">
                <h4 className='audiohead'>Audio Settings</h4>
                <ul className='ulhead'>
                    <li className='listitem'>
                        Select / Check Microphone
                        <img className='mic' src={Microphone} alt=""></img>
                        <button className="rightbtn">Test</button>
                    </li>
                    <li className='listitem'>
                        Select / Check Microphone
                        <img className='mic' src={Microphone} alt=""></img>
                        <button className="rightbtn">Test</button>
                    </li>
                    <li className='listitem'>
                        Select / Check Microphone
                        <img className='mic' src={Microphone} alt=""></img>
                        <button className="rightbtn">Test</button>
                    </li>
                    <li className='listitem'>
                        Select / Check Microphone
                        <img className='mic' src={Microphone} alt=""></img>
                        <button className="rightbtn">Test</button>
                    </li>
                    <li className='listitem'>
                        Select / Check Microphone
                        <img className='mic' src={Microphone} alt=""></img>
                        <button className="rightbtn">Test</button>
                    </li>
                    <li className='listitem'>
                        Select / Check Microphone
                        <img className='mic' src={Microphone} alt=""></img>
                        <button className="rightbtn">Test</button>
                    </li>
                    <li className='listitem'>
                        Select / Check Microphone
                        <img className='mic' src={Microphone} alt=""></img>
                        <button className="rightbtn">Test</button>
                    </li>
                    <li className='listitem'>
                        Select / Check Microphone
                        <img className='mic' src={Microphone} alt=""></img>
                        <button className="rightbtn">Test</button>
                    </li>
                    <li className='listitem'>
                        Select / Check Microphone
                        <img className='mic' src={Microphone} alt=""></img>
                        <button className="rightbtn">Test</button>
                    </li>
                </ul>
            </div>
         );
    }
}
 
export default Settings;