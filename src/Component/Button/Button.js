import React from 'react';
import './Button.css'
import {useNavigate } from 'react-router-dom';

export default function Button(props) {
const navigate = useNavigate();

  return (
    <button className='btn btn_header' onClick={() => navigate(props.destination)}>
      {props.txt}
    </button>
  )
}
