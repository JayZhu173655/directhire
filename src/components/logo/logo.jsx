import React from 'react';
import logo from './log.png';
import './logo.less';

export default function Log(){
    return (
        <div className='logo-container'>
            <img src={logo} alt="logo" className='logo-img'/>
        </div>
    )
};