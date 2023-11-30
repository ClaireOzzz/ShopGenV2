// Header.js
import React, { useState } from 'react';
import './App.css';

function Header({ onPageButtonClick }) {
  return (
    <>
      <div>
        <img src="./SUNS.png" className="logo" alt="SUNS" />
        <div className="buttonContainer">
          <div className="buttonGroup">
            <button className="circularButton" onClick={() => onPageButtonClick('Visualisation')}>
              1
            </button>
            <div className="buttonText">Visualisation</div>
          </div>
          <div className="buttonGroup">
            <button className="circularButton" onClick={() => onPageButtonClick('Review')}>
              2
            </button>
            <div className="buttonText">Review</div>
          </div>
          <div className="buttonGroup">
            <button className="circularButton" onClick={() => onPageButtonClick('Prompt')}>
              3
            </button>
            <div className="buttonText">Prompt</div>
          </div>
          <div className="buttonGroup">
            <button className="circularButton" onClick={() => onPageButtonClick('Generate')}>
              4
            </button>
            <div className="buttonText">Generate</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
