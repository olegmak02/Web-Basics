import React from 'react';
import './components.css';

const card_style = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  width: 'fit-content',
  height: 'fit-content',
  margin:'auto',
  marginTop: '50px',
  display:'block',
};

function GoodsCard(props) {
  return (
    <div style={card_style}>
        <img src={props.photo}/> 
        <h1>{props.name}</h1>
        <p style={{fontSize:'30px'}}>{props.price + " ₴"}</p>
    </div>
  );
}

export default GoodsCard;