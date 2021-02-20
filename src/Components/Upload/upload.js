import React from 'react';
import Close from '../../icons/Group 429.png';
import './upload.css';

const upload =(props) => {
        return (
            <div className='popup'>
            <div className="box5">
                <img className='closeupload' src={Close} alt="" onClick={props.click2}></img>
                <h4 className='uploadhead' >Upload Picture</h4>
                <input name='image' id='file' type='file' accept='image/*' className='id' onChange={props.click1}></input>
                <label className='for' htmlFor='file'>Upload from your Computer</label>
                <div className='divs'>Open Camera</div>
            </div>
            </div>
         )
};

export default upload;
