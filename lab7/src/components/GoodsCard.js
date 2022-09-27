import React from 'react';
import './components.css';

function GoodsCard(props) {
  return (
    <div>
        <img src={props.photo}/> 
        <p>{props.name}</p>
        <p >{props.price + " ₴"}</p>
    </div>
  );
}

export default GoodsCard;